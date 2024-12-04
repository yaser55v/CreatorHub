import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

export function AuthNavbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-800 bg-black/50 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Bot className="h-8 w-8 text-purple-500" />
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-xl font-bold text-transparent">
            CreatorHub
          </span>
        </Link>
      </div>
    </nav>
  );
}