'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavLinks() {
  const pathname = usePathname();

  const handleHomeClick = (e: React.MouseEvent) => {
    // If already on home page, force a full reload to reset state
    if (pathname === '/') {
      e.preventDefault();
      window.location.href = '/';
    }
  };

  return (
    <div className="flex gap-4">
      <Link
        href="/"
        onClick={handleHomeClick}
        className="text-gray-600 hover:text-indigo-600 text-sm"
      >
        Chat
      </Link>
      <Link href="/goals" className="text-gray-600 hover:text-indigo-600 text-sm">
        Goals
      </Link>
      <Link href="/review" className="text-gray-600 hover:text-indigo-600 text-sm">
        Review
      </Link>
      <Link href="/challenges" className="text-gray-600 hover:text-indigo-600 text-sm">
        Challenges
      </Link>
    </div>
  );
}

export function HomeLink() {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.location.href = '/';
    }
  };

  return (
    <Link href="/" onClick={handleClick} className="font-semibold text-indigo-600">
      Daily Check-in
    </Link>
  );
}
