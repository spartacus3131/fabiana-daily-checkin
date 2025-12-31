export interface ChallengeContent {
  number: number;
  title: string;
  part: number;
  partName: string;
  whatYouGet: string;
  theChallenge: string;
  steps: string[];
  tips: string[];
  questions: string[];
}

export const CHALLENGE_CONTENT: ChallengeContent[] = [
  {
    number: 1,
    title: "The Values Challenge",
    part: 1,
    partName: "Laying the Groundwork",
    whatYouGet: "Access to your deeper reasons for becoming more productive. If you're using these tactics to take more on, you could potentially save countless hours by only focusing on the productivity goals you care about.",
    theChallenge: "Ask yourself simple questions to identify your deepest-held values and create a plan to act in accordance with them.",
    steps: [
      "Imagine you have two more hours of leisure time every day. How will you use that time? What new things will you take on?",
      "What productivity goals or new habits, routines, or rituals did you have in mind that you wanted to take on?",
      "Ask yourself: What deep-rooted values are associated with your productivity goals? Why do you want to become more productive?"
    ],
    tips: [
      "Fill in the blank: 'I deeply care about this because ____.' Spin off as many reasons as you can.",
      "Deathbed test: Fast-forward to when you're on your deathbed. Would you regret doing more or less of this?",
      "Use the Values → Goals → Intention → Action framework"
    ],
    questions: [
      "If you had 2 extra hours every day, how would you spend them?",
      "What values come up when you think about why you want to be more productive?",
      "Would your future self thank you for this goal?"
    ]
  },
  {
    number: 2,
    title: "The Impact Challenge",
    part: 1,
    partName: "Laying the Groundwork",
    whatYouGet: "You will discover the highest-impact tasks in your work, which will show you where you should invest the majority of your time, attention, and energy.",
    theChallenge: "Of all the challenges in this book, this is one of the most important. Identify the 3 tasks that contribute 80% of your value.",
    steps: [
      "Make a list of everything you're responsible for in your work and life.",
      "Ask yourself: If you could just do ONE item on that list all day, what would allow you to accomplish the most?",
      "Then ask: What second and third tasks let you accomplish the most in the same amount of time?"
    ],
    tips: [
      "These three tasks are the 20% that contribute at least 80% of your value",
      "Think about what's most valuable to your boss, your family, or yourself",
      "This challenge lays the groundwork for everything else"
    ],
    questions: [
      "What are you responsible for in your daily life?",
      "Which single task creates the most value when you do it?",
      "What are your top 3 highest-impact activities?"
    ]
  },
  {
    number: 3,
    title: "The Rule of 3 Challenge",
    part: 1,
    partName: "Laying the Groundwork",
    whatYouGet: "You'll be able to step back to determine what your most productive tasks are at the beginning of the day, giving you something to focus on throughout the day.",
    theChallenge: "Before you open up your inbox or start your day tomorrow, write down the three main things you want to have accomplished when the day is done.",
    steps: [
      "Sit down with a pen and paper before checking email",
      "Mentally fast-forward to the end of the day",
      "Write down the 3 things you want to have accomplished"
    ],
    tips: [
      "Think in terms of wins, achievements, or highlights",
      "Look through your calendar to see what time you have available",
      "Set two alarms during your workday to ask: Am I on track for my 3 goals?",
      "At the end of the day, reflect on how realistic your goals were"
    ],
    questions: [
      "What 3 things would make today feel like a win?",
      "What's on your calendar that affects your available time?",
      "Are these tasks aligned with your highest-impact work?"
    ]
  },
  {
    number: 4,
    title: "The Prime-Time Challenge",
    part: 2,
    partName: "Wasting Time",
    whatYouGet: "An understanding of how well you manage the three ingredients of productivity (time, attention, energy), so you know your starting point.",
    theChallenge: "Track your energy levels throughout the day to determine your Biological Prime Time (BPT) - when you naturally have the most energy and focus.",
    steps: [
      "Every hour, note how much energy you have (1-10 scale)",
      "Track what you're doing and how many minutes you procrastinated",
      "Do this for at least 3 days to see patterns"
    ],
    tips: [
      "For best results: cut caffeine, eat small frequent meals, wake naturally without alarm",
      "Use apps like RescueTime or Toggl to help track",
      "Don't be too hard on yourself about procrastination - just be honest"
    ],
    questions: [
      "When do you typically feel most alert and focused?",
      "When do you notice your energy dipping?",
      "What patterns do you see in when you procrastinate?"
    ]
  },
  {
    number: 5,
    title: "The Flipping Challenge",
    part: 2,
    partName: "Wasting Time",
    whatYouGet: "The ugliest tasks in your work and personal life will become much more appealing, and you will waste less time when you work on them.",
    theChallenge: "When you notice yourself procrastinating, identify which triggers are making the task aversive, then flip them.",
    steps: [
      "Notice when you're putting off a task",
      "Identify the procrastination triggers: Is it boring? Frustrating? Difficult? Ambiguous? Unstructured? Lacking meaning?",
      "Make a plan to flip those triggers"
    ],
    tips: [
      "Create a procrastination list: write down the costs of putting off the task",
      "The tasks that make you most productive are often the most aversive",
      "Just getting started often breaks the resistance"
    ],
    questions: [
      "What tasks do you tend to put off?",
      "What makes those tasks feel aversive to you?",
      "How could you make them more appealing?"
    ]
  },
  {
    number: 6,
    title: "The Time-Traveling Challenge",
    part: 2,
    partName: "Wasting Time",
    whatYouGet: "You'll become less likely to put things off until tomorrow because you no longer see your future self as a stranger.",
    theChallenge: "Connect with your future self to reduce procrastination. When you put something off, you're being unfair to future you.",
    steps: [
      "Rate how connected you feel to your future self (1-10)",
      "Download an app like AgingBooth to see what you'll look like older",
      "Send a letter to future you through FutureMe.org",
      "Create a future memory - imagine your future self vividly"
    ],
    tips: [
      "The more you identify with your future self, the less you procrastinate",
      "Think about how future you will feel about today's decisions",
      "Your future self will thank you"
    ],
    questions: [
      "How connected do you feel to your future self?",
      "What would future you say about how you spend your time today?",
      "What's one thing you could do today that future you would appreciate?"
    ]
  },
  {
    number: 7,
    title: "The Disconnecting Challenge",
    part: 2,
    partName: "Wasting Time",
    whatYouGet: "You'll waste much less time and find yourself working on higher-impact and meaningful tasks more often.",
    theChallenge: "Disconnect from the internet for thirty minutes tomorrow. Put your phone on airplane mode or disconnect from Wi-Fi.",
    steps: [
      "Choose a 30-minute block tomorrow",
      "Put your phone on airplane mode or disconnect Wi-Fi",
      "Work on one of your important tasks",
      "Observe how much you get done"
    ],
    tips: [
      "When you notice surfing on autopilot, use that as a trigger to disconnect",
      "You may feel bored as your brain adjusts - that's your limbic system begging for stimulation",
      "Consider implementing a nightly shutoff ritual"
    ],
    questions: [
      "When could you disconnect for 30 minutes tomorrow?",
      "What important task will you work on during that time?",
      "How did it feel to be disconnected?"
    ]
  },
  {
    number: 8,
    title: "The Shrink Your Work Challenge",
    part: 3,
    partName: "The End of Time Management",
    whatYouGet: "You'll learn to expend more energy and attention on your work to get things done in a fraction of the time.",
    theChallenge: "Tomorrow, limit how much time you'll spend on an important task to HALF of what you think it will take, and stick to that limit.",
    steps: [
      "Pick an important task",
      "Estimate how long it will take",
      "Set a timer for HALF that time",
      "Work with full focus until the timer ends"
    ],
    tips: [
      "This works best on important tasks with approaching deadlines",
      "Working consistently long hours makes you less productive over time",
      "Energy and attention expand to fill available time"
    ],
    questions: [
      "What important task could you shrink tomorrow?",
      "How long do you think it will take?",
      "Can you commit to doing it in half that time?"
    ]
  },
  {
    number: 9,
    title: "The Working in Prime Time Challenge",
    part: 3,
    partName: "The End of Time Management",
    whatYouGet: "You'll get your most important tasks done more efficiently because you'll work on them when you have the most energy.",
    theChallenge: "Let your Biological Prime Time and energy levels dictate what you work on. Schedule important tasks during your peak energy hours.",
    steps: [
      "Identify your BPT from the Prime-Time Challenge",
      "Schedule your 3 most important tasks during your BPT",
      "Block off your BPT in your calendar",
      "Save low-energy tasks for low-energy times"
    ],
    tips: [
      "Be defensive of your BPT - that time is sacred",
      "Adapt on the fly when you have unusually high or low energy days",
      "If you're on a maker's schedule, chunk meetings together"
    ],
    questions: [
      "When is your Biological Prime Time?",
      "What high-impact tasks will you schedule during BPT?",
      "How will you protect that time from interruptions?"
    ]
  },
  {
    number: 10,
    title: "The Maintenance Challenge",
    part: 3,
    partName: "The End of Time Management",
    whatYouGet: "You'll carve out more attention and energy for important things by batching maintenance tasks together.",
    theChallenge: "Establish a Maintenance Day ritual - batch all your low-energy maintenance tasks into one dedicated time block.",
    steps: [
      "Week 1: As you do maintenance tasks, write them down on a list",
      "Week 2: Schedule a Maintenance Day (or half day) to tackle them all at once",
      "Use the spare mental energy during maintenance for something meaningful (podcast, audiobook)"
    ],
    tips: [
      "Don't tackle maintenance tasks during your BPT - that time is sacred!",
      "Examples: laundry, groceries, emails, errands, cleaning",
      "Once you start, you won't go back"
    ],
    questions: [
      "What maintenance tasks do you do regularly?",
      "When could you batch these together?",
      "What could you listen to or think about while doing them?"
    ]
  },
  {
    number: 11,
    title: "The Zenning Out Challenge",
    part: 3,
    partName: "The End of Time Management",
    whatYouGet: "You'll spend more time on your highest-impact tasks instead of treading water on support tasks.",
    theChallenge: "Choose one or two low-impact support tasks and shrink them by setting limits on time or frequency.",
    steps: [
      "Identify low-impact tasks that eat up your time (email, social media, meetings)",
      "Set a time limit or frequency limit for each",
      "Stick to those limits"
    ],
    tips: [
      "Your limbic system will feel guilty - resist the urge!",
      "That sense of misplaced guilt goes away with time",
      "Reward yourself after successfully shrinking low-return tasks"
    ],
    questions: [
      "What low-impact tasks consume too much of your time?",
      "What limits could you set on them?",
      "How will you reward yourself for sticking to limits?"
    ]
  },
  {
    number: 12,
    title: "The Delegation Challenge",
    part: 3,
    partName: "The End of Time Management",
    whatYouGet: "A deeper understanding of how much your time is worth, helping you decide what to delegate or outsource.",
    theChallenge: "Calculate the value of your time. Think about how much you would pay to buy back an hour of your life.",
    steps: [
      "Calculate your hourly rate (or estimate the value of your time)",
      "Look at the cost of hiring help (assistant, cleaner, virtual assistant)",
      "Identify tasks that cost less to outsource than your time is worth",
      "Say no to 5 things tomorrow"
    ],
    tips: [
      "Your time is the most limited of the three productivity ingredients",
      "Think about what commitments add the least value to your life",
      "Sometimes the best productivity hack is saying no"
    ],
    questions: [
      "What is an hour of your time worth?",
      "What tasks could you delegate or outsource?",
      "What 5 things could you say no to?"
    ]
  },
  {
    number: 13,
    title: "The Capture Challenge",
    part: 4,
    partName: "Quiet Your Mind",
    whatYouGet: "You'll clear up an incredible amount of mental space and feel calmer and more confident that nothing will slip through the cracks.",
    theChallenge: "Perform a brain dump ritual. Shut off all devices and capture everything in your mind onto paper.",
    steps: [
      "Shut off all your devices",
      "Sit down with only a notepad and pen",
      "Write down everything that bubbles up - tasks, worries, ideas, things you're avoiding",
      "Keep going until your mind feels clear"
    ],
    tips: [
      "This is perhaps the most fun and freeing challenge in the book",
      "Smaller changes are more likely to stick",
      "After capturing, consider managing everything in an external system"
    ],
    questions: [
      "What's on your mind right now?",
      "What tasks or worries are taking up mental space?",
      "What have you been avoiding or putting off?"
    ]
  },
  {
    number: 14,
    title: "The Hot Spot Challenge",
    part: 4,
    partName: "Quiet Your Mind",
    whatYouGet: "You'll see your life from a perspective you've never had before and be able to reflect on the importance of all your commitments.",
    theChallenge: "Create a scannable list of your life's 'hot spots' - the 7 key areas that need your attention.",
    steps: [
      "Take 10 minutes to expand each area of your life",
      "The 7 hot spots: Mind, Body, Emotions, Career, Finances, Relationships, Fun",
      "Review your list weekly on your Maintenance Day",
      "Adjust course when you're not acting in accordance with what's important"
    ],
    tips: [
      "This gives you an incredible feeling of being able to envision every aspect of your life",
      "Pull tasks from your hot spots to plan each week",
      "Don't be too hard on yourself - nobody is perfect"
    ],
    questions: [
      "How is each of your 7 hot spots doing right now?",
      "Which areas need more attention?",
      "What's one thing you could do for each area this week?"
    ]
  },
  {
    number: 15,
    title: "The Wandering Challenge",
    part: 4,
    partName: "Quiet Your Mind",
    whatYouGet: "A wealth of brand-new ideas that are residing in your brain, waiting to be harvested once you give them attentional space.",
    theChallenge: "Let your mind wander for at least 15 minutes tomorrow, and capture any valuable thoughts that emerge.",
    steps: [
      "Sit somewhere you won't be distracted",
      "Have just a pen and notepad",
      "Set a timer for 15 minutes",
      "Let your mind wander and capture what comes up"
    ],
    tips: [
      "You'll be stunned at what comes to mind",
      "You may want to keep going longer",
      "Capture ideas so nothing slips through the cracks"
    ],
    questions: [
      "When could you let your mind wander for 15 minutes?",
      "What ideas emerged during your mind-wandering session?",
      "Did anything surprise you?"
    ]
  },
  {
    number: 16,
    title: "The Notification Challenge",
    part: 5,
    partName: "The Attention Muscle",
    whatYouGet: "You'll potentially reclaim hours of lost productivity every day because you won't be interrupted by alerts and notifications.",
    theChallenge: "Dive into the settings on ALL your devices and disable notification alerts - buzzes, beeps, alert boxes, everything.",
    steps: [
      "Go through your phone settings and disable notifications",
      "Do the same for your computer, tablet, and smartwatch",
      "Be especially defensive of notifications during your BPT"
    ],
    tips: [
      "Every interruption costs you about 25 minutes of lost productivity",
      "Your limbic system may feel the loss of stimulation at first",
      "You'll have more attention for meaningful and important work"
    ],
    questions: [
      "Which devices interrupt you most often?",
      "What notifications can you turn off right now?",
      "How will you check things intentionally instead of reactively?"
    ]
  },
  {
    number: 17,
    title: "The Single-Tasking Challenge",
    part: 5,
    partName: "The Attention Muscle",
    whatYouGet: "You'll build up your attention muscle so you can devote more focus to the task at hand.",
    theChallenge: "Spend 15-30 minutes tomorrow focusing on just ONE thing. When your mind wanders, gently bring it back.",
    steps: [
      "Choose one important task",
      "Set a timer for 15-30 minutes",
      "Focus only on that one thing",
      "When your mind wanders, gently redirect your focus"
    ],
    tips: [
      "The more important the task, the more you'll get out of this",
      "Don't be too hard on yourself when your mind wanders",
      "The benefits compound over time"
    ],
    questions: [
      "What single task will you focus on?",
      "How long will you single-task?",
      "How many times did your mind wander?"
    ]
  },
  {
    number: 18,
    title: "The Meditation Challenge",
    part: 5,
    partName: "The Attention Muscle",
    whatYouGet: "You'll build your attention muscle even more, letting you keep long-term goals in mind and act more deliberately.",
    theChallenge: "Work out your attention muscle for 5 minutes every day for the next 7 days through meditation or mindfulness.",
    steps: [
      "Commit to 5 minutes of meditation daily for 7 days",
      "Sit comfortably, close your eyes, focus on your breath",
      "When your mind wanders, bring it back to your breath",
      "Plant one 'microintention' into your work tomorrow"
    ],
    tips: [
      "Your brain will resist this - that's normal, it's your limbic system fighting back",
      "Every time you bring your wandering mind back, your attention muscle gets stronger",
      "You can do pretty much anything for 5 minutes"
    ],
    questions: [
      "When will you meditate each day?",
      "What microintention will you plant for tomorrow?",
      "How did meditation affect your focus?"
    ]
  },
  {
    number: 19,
    title: "The Lamest Diet Challenge",
    part: 6,
    partName: "Taking Productivity to the Next Level",
    whatYouGet: "More constant energy levels because you'll provide your body and brain with steady glucose throughout the day.",
    theChallenge: "Make ONE small incremental improvement to how you eat - either eat more unprocessed foods or become more mindful of portions.",
    steps: [
      "Pick just ONE small change to make",
      "Examples: no sugar in coffee, vegetables instead of chips, don't eat in front of computer",
      "Stick with this one change until it becomes habit"
    ],
    tips: [
      "The best diet is your current one with one small improvement",
      "Small changes stick because they don't use up all your willpower",
      "Review your hot spots to remind yourself to make another improvement later"
    ],
    questions: [
      "What's one small improvement you could make to your eating?",
      "Is this change small enough that you'll actually stick with it?",
      "How do you feel after a week of this change?"
    ]
  },
  {
    number: 20,
    title: "The Water Challenge",
    part: 6,
    partName: "Taking Productivity to the Next Level",
    whatYouGet: "Fewer energy crashes throughout the day and more overall energy throughout the week.",
    theChallenge: "Make one small incremental improvement to what you drink this week.",
    steps: [
      "Choose ONE change to your drinking habits",
      "Examples: fewer sugary drinks, reduce caffeine tolerance, drink caffeine strategically, less alcohol, more water"
    ],
    tips: [
      "Sugary drinks spike glucose and cause energy crashes",
      "Drink caffeine strategically - before important tasks or between 9:30-11:30am",
      "What's good for your brain is good for your body"
    ],
    questions: [
      "What do you typically drink throughout the day?",
      "What's one improvement you could make to your drinking habits?",
      "How do your energy levels change after making this change?"
    ]
  },
  {
    number: 21,
    title: "The Heart Rate Challenge",
    part: 6,
    partName: "Taking Productivity to the Next Level",
    whatYouGet: "Incredible neurological benefits: more energy, focus, stamina, resilience, memory, and less stress and fatigue.",
    theChallenge: "Elevate your heart rate for 15 minutes tomorrow through walking, jogging, or any aerobic exercise.",
    steps: [
      "Choose a form of exercise that gets your blood pumping",
      "Commit to just 15 minutes",
      "If you feel resistance, shrink the time until you don't"
    ],
    tips: [
      "Start small - making lasting changes requires not intimidating yourself",
      "Exercise can seem boring, frustrating, difficult, and unstructured - that's why people put it off",
      "After exercising, ask: Do I have more energy? Is my head clearer? Am I less stressed?"
    ],
    questions: [
      "What form of exercise will you do tomorrow?",
      "When will you do it?",
      "How did you feel afterward?"
    ]
  },
  {
    number: 22,
    title: "The Sleeping Challenge",
    part: 6,
    partName: "Taking Productivity to the Next Level",
    whatYouGet: "More time saved because you'll work more efficiently. Plus: mental clarity, concentration, short-term memory, and fewer mistakes.",
    theChallenge: "Reflect on whether you're getting enough sleep. If not, make a plan to fix it.",
    steps: [
      "Ask yourself: Do you need to catch up on sleep over the weekend?",
      "If yes, you're not getting enough during the week",
      "Pick a specific target bedtime and work backward to plan a bedtime ritual"
    ],
    tips: [
      "Watch out for blue light exposure before bed",
      "Be mindful of caffeine up to 10 hours before bed",
      "Keep your sleeping environment cool and comfortable",
      "For every hour of sleep you miss, you lose at least 2 hours of productivity"
    ],
    questions: [
      "Do you feel the need to catch up on sleep on weekends?",
      "What time do you want to be in bed?",
      "What will your bedtime ritual look like?"
    ]
  }
];

export function getChallengeContent(challengeNumber: number): ChallengeContent | undefined {
  return CHALLENGE_CONTENT.find(c => c.number === challengeNumber);
}
