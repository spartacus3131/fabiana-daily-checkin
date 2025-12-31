'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Message, DailyEntry, CHALLENGES } from '@/lib/types';
import { loadState, saveEntry, getTodayKey, getEntryForDate, getCurrentChallenge, getCurrentWeekGoals, getActiveParkingLotItems } from '@/lib/storage';
import { getMorningSystemPrompt, getEveningSystemPrompt, getChallengeConversationPrompt } from '@/lib/prompts';

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [checkInType, setCheckInType] = useState<'morning' | 'evening' | 'challenge'>('morning');
  const [hasStarted, setHasStarted] = useState(false);
  const [challengeNumber, setChallengeNumber] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check for challenge conversation on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const challengeToStart = sessionStorage.getItem('startChallengeConversation');
      if (challengeToStart) {
        sessionStorage.removeItem('startChallengeConversation');
        const num = parseInt(challengeToStart, 10);
        if (num >= 1 && num <= 22) {
          setChallengeNumber(num);
          setCheckInType('challenge');
          // Auto-start the challenge conversation
          setTimeout(() => {
            startChallengeConversation(num);
          }, 100);
        }
      }
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setInput(prev => prev + finalTranscript + ' ');
          }
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            alert('Microphone access denied. Please allow microphone access in your browser settings.');
          } else if (event.error === 'no-speech') {
            // This is normal - just means no speech was detected
          } else {
            alert(`Speech recognition error: ${event.error}`);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setInput('');
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
        alert('Failed to start microphone. Please make sure no other app is using it.');
      }
    }
  }, [isListening]);

  const getSystemPrompt = useCallback(() => {
    if (checkInType === 'challenge' && challengeNumber) {
      return getChallengeConversationPrompt(challengeNumber);
    }
    const state = loadState();
    const currentChallenge = getCurrentChallenge(state);

    // Check if hotspot challenge (14) is complete
    const hotspotChallenge = state.challenges.find(c => c.challengeNumber === 14);
    const hotspotComplete = hotspotChallenge?.status === 'completed';

    // Check if it's start of week (Sunday or Monday) for morning, or end of week (Friday/Saturday) for evening
    const dayOfWeek = new Date().getDay();
    const isStartOfWeek = checkInType === 'morning' && (dayOfWeek === 0 || dayOfWeek === 1); // Sun or Mon
    const isEndOfWeek = checkInType === 'evening' && (dayOfWeek === 5 || dayOfWeek === 6); // Fri or Sat

    // Get current weekly goals and parking lot items
    const weeklyGoals = getCurrentWeekGoals(state);
    const parkingLotItems = getActiveParkingLotItems(state);

    const options = {
      currentChallenge,
      hotspotComplete,
      isStartOfWeek: isStartOfWeek || isEndOfWeek,
      weeklyGoals,
      parkingLotItems,
    };

    return checkInType === 'morning'
      ? getMorningSystemPrompt(options)
      : getEveningSystemPrompt(options);
  }, [checkInType, challengeNumber]);

  const startChallengeConversation = async (num: number) => {
    setHasStarted(true);
    setIsLoading(true);
    setChallengeNumber(num);
    setCheckInType('challenge');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [],
          systemPrompt: getChallengeConversationPrompt(num),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start challenge conversation');
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages([assistantMessage]);
    } catch (error) {
      console.error('Error starting challenge:', error);
      const errMsg = error instanceof Error ? error.message : 'Unknown error';
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Connection error: ${errMsg}`,
        timestamp: new Date(),
      };
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startCheckIn = useCallback(async () => {
    setHasStarted(true);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [],
          systemPrompt: getSystemPrompt(),
        }),
      });

      if (!response.ok) throw new Error('Failed to start check-in');

      const data = await response.json();
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages([assistantMessage]);
    } catch (error) {
      console.error('Error starting check-in:', error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "Hi! I'm having trouble connecting right now. Please check your API key and try again.",
        timestamp: new Date(),
      };
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [getSystemPrompt]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Stop listening if active
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          systemPrompt: getSystemPrompt(),
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);

      // Save entry after each exchange (only for morning/evening check-ins)
      if (checkInType !== 'challenge') {
        const state = loadState();
        const todayKey = getTodayKey();
        const existingEntry = getEntryForDate(state, todayKey, checkInType as 'morning' | 'evening');

        const entry: DailyEntry = existingEntry || {
          id: crypto.randomUUID(),
          date: todayKey,
          type: checkInType as 'morning' | 'evening',
          messages: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        entry.messages = updatedMessages;
        entry.updatedAt = new Date();
        saveEntry(state, entry);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: "I'm having trouble responding. Please try again.",
        timestamp: new Date(),
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, isListening, getSystemPrompt, checkInType]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetCheckIn = () => {
    setMessages([]);
    setHasStarted(false);
    setInput('');
    setChallengeNumber(null);
    setCheckInType(new Date().getHours() < 15 ? 'morning' : 'evening');
  };

  // Determine time of day for default
  useEffect(() => {
    if (checkInType !== 'challenge') {
      const hour = new Date().getHours();
      setCheckInType(hour < 15 ? 'morning' : 'evening');
    }
  }, []);

  const challengeTitle = challengeNumber
    ? CHALLENGES.find(c => c.number === challengeNumber)?.title
    : null;

  if (!hasStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Daily Check-in
            </h1>
            <p className="text-gray-600">
              Take a moment to clear your mind and set your intentions
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCheckInType('morning')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                checkInType === 'morning'
                  ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-400'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Morning
            </button>
            <button
              onClick={() => setCheckInType('evening')}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                checkInType === 'evening'
                  ? 'bg-indigo-100 text-indigo-700 ring-2 ring-indigo-400'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Evening
            </button>
          </div>

          <button
            onClick={startCheckIn}
            className="w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Start {checkInType === 'morning' ? 'Morning' : 'Evening'} Check-in
          </button>

          <p className="text-sm text-gray-500">
            {checkInType === 'morning'
              ? "Brain dump, clarify your thoughts, and set your top 3 priorities"
              : "Reflect on what got done, practice gratitude, and close the day"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-56px)]">
      {/* Header for challenge mode */}
      {checkInType === 'challenge' && challengeTitle && (
        <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-2">
          <p className="text-sm text-indigo-600 font-medium text-center">
            Working through: {challengeTitle}
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-800 shadow-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t bg-white p-4">
        <div className="max-w-4xl mx-auto flex gap-2 items-end">
          <button
            onClick={toggleListening}
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isListening ? 'Listening...' : 'Type or tap mic to speak...'}
            className="flex-1 resize-none rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <div className="max-w-4xl mx-auto mt-2 flex justify-center">
          <button
            onClick={resetCheckIn}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Start new check-in
          </button>
        </div>
      </div>
    </div>
  );
}
