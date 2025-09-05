import { BarChart3, FileText, Users, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '../ui/button';

export function Sidebar() {
	const location = useLocation();
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);

	const menuItems = [
		{ id: 'dashboard', label: '대시보드', icon: BarChart3 },
		{ id: 'forms', label: '응답 관리', icon: FileText },
	];

	const handleMovePage = (path: string) => {
		navigate(`/${path}`);
	};

	return (
		<>
			{/* Mobile menu button */}
			<Button
				variant="ghost"
				size="sm"
				className="fixed top-16 left-16 z-50 md:hidden"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <X className="h-20 w-20" /> : <Menu className="h-20 w-20" />}
			</Button>

			{/* Overlay for mobile */}
			{isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}

			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 z-40 h-full w-240 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:z-auto md:translate-x-0`}
			>
				<div className="p-30">
					<h1 className="mx-auto w-fit text-blue-600">
						<img src="/logo.png" alt="logo" />
					</h1>
				</div>

				<nav className="px-16">
					<ul className="space-y-8">
						{menuItems.map((item) => {
							const Icon = item.icon;
							return (
								<li key={item.id}>
									<Button
										variant={location.pathname.includes(item.id) ? 'secondary' : 'ghost'}
										className="w-full justify-start"
										onClick={() => handleMovePage(item.id)}
									>
										<Icon className="mr-12 h-16 w-16" />
										{item.label}
									</Button>
								</li>
							);
						})}
					</ul>
				</nav>
			</aside>
		</>
	);
}
