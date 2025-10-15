import { BarChart3, FileText, Loader2, Menu, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLogoutApi } from '@/apis/auth';
import { uploadFile } from '@/apis/file';
import { cn } from '@/lib/utils';
import useTokenStore from '@/stores/useTokenStore';

import { Button } from '../ui/button';

export function Sidebar() {
	const location = useLocation();
	const navigate = useNavigate();

	const fileRef = useRef<HTMLInputElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const tokenStore = useTokenStore();

	const { mutateAsync: mutateLogout } = useLogoutApi();

	const menuItems = [
		{ id: 'dashboard', label: '대시보드', icon: BarChart3 },
		{ id: 'forms', label: '응답 관리', icon: FileText },
	];

	const handleMovePage = (path: string) => {
		navigate(`/${path}`);
	};

	const handleUploadExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);

		setIsLoading(true);

		await uploadFile(formData).then((res) => {
			console.log(res);
			setIsLoading(false);
		});

		e.target.value = '';
	};

	const handleLogout = async () => {
		const res = await mutateLogout({ refreshToken: tokenStore.refreshToken });
		if (res.status === 200) {
			tokenStore.reset();
			navigate('/login');
		}
	};

	return (
		<>
			{/* Mobile menu button */}
			<Button
				variant="outline"
				size="sm"
				className="fixed top-20 left-16 z-50 h-32 w-32 md:hidden"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? <X className="h-20 w-20" /> : <Menu className="h-20 w-20" />}
			</Button>

			{/* Overlay for mobile */}
			{isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}

			{/* Sidebar */}
			<aside
				className={cn(
					// Base positioning and size
					'fixed top-0 left-0 z-40 h-full w-240',

					// Scrolling and layout
					'transform overflow-y-auto',

					// Styling
					'border-r border-gray-200 bg-white',

					// Animations
					'transition-transform duration-300 ease-in-out',

					// Mobile responsive behavior
					isOpen ? 'translate-x-0' : '-translate-x-full',

					// Desktop responsive behavior
					'md:sticky md:z-auto md:translate-x-0',

					// Flex layout
					'flex flex-col pb-20'
				)}
			>
				<div className="p-30">
					<h1 className="mx-auto w-fit text-blue-600">
						<img src="/logo.png" alt="logo" />
					</h1>
				</div>

				<nav className="flex-1 px-16">
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

				<div className="mt-auto flex flex-col gap-8 px-16">
					<Button variant="default" className="w-full" onClick={() => fileRef.current?.click()} disabled={isLoading}>
						{isLoading ? <Loader2 className="size-24 animate-spin" /> : '엑셀 업로드'}
					</Button>
					<input type="file" ref={fileRef} className="hidden" onChange={handleUploadExcel} />

					<Button variant="outline" className="w-full" onClick={handleLogout}>
						로그아웃
					</Button>
				</div>
			</aside>
		</>
	);
}
