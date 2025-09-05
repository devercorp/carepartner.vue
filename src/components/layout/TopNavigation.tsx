import { Search, Bell, MessageCircle, Moon, Sun, Globe, Settings, LogOut, User } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';

interface TopNavigationProps {
	onLogout: () => void;
}

export function TopNavigation({ onLogout }: TopNavigationProps) {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [language, setLanguage] = useState('ko');

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.documentElement.classList.toggle('dark');
	};

	const toggleLanguage = () => {
		setLanguage(language === 'ko' ? 'en' : 'ko');
	};

	return (
		<header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
			{/* Search */}
			<div className="max-w-md flex-1">
				<div className="relative">
					<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
					<Input placeholder="검색..." className="border-0 bg-gray-50 pl-10" />
				</div>
			</div>

			{/* Right side actions */}
			<div className="flex items-center gap-2">
				{/* Language Switcher */}
				<Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2">
					<Globe className="h-4 w-4" />
					{language === 'ko' ? '한국어' : 'English'}
				</Button>

				{/* Dark Mode Toggle */}
				<Button variant="ghost" size="sm" onClick={toggleDarkMode}>
					{isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
				</Button>

				{/* Notifications */}
				<Button variant="ghost" size="sm" className="relative">
					<Bell className="h-4 w-4" />
					<Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs">
						3
					</Badge>
				</Button>

				{/* Chat */}
				<Button variant="ghost" size="sm" className="relative">
					<MessageCircle className="h-4 w-4" />
					<Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 p-0 text-xs">
						2
					</Badge>
				</Button>

				{/* User Profile */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="gap-2 px-2">
							<Avatar className="h-8 w-8">
								<AvatarImage src="/placeholder-avatar.jpg" />
								<AvatarFallback>관리자</AvatarFallback>
							</Avatar>
							<span className="hidden md:block">관리자</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<DropdownMenuItem>
							<User className="mr-2 h-4 w-4" />내 프로필
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className="mr-2 h-4 w-4" />
							설정
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={onLogout}>
							<LogOut className="mr-2 h-4 w-4" />
							로그아웃
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
