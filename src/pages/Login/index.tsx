import { BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert, AlertDescription } from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const LoginPage = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (email === 'admin@admin.com' && password === 'admin1234') {
			navigate('/');
		} else {
			setError('잘못된 이메일 또는 비밀번호입니다. admin@admin.com / admin1234 을 사용하세요');
		}

		setIsLoading(false);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 p-16">
			<Card className="w-full max-w-2xl">
				<CardHeader className="text-center">
					<div className="mb-16 flex justify-center">
						<div className="rounded-full bg-blue-100 p-12">
							<BarChart3 className="h-32 w-32 text-blue-600" />
						</div>
					</div>
					<CardTitle className="text-3xl">보살핌 관리자</CardTitle>
					<p className="text-muted-foreground text-xl">대시보드에 로그인하세요</p>
				</CardHeader>

				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-16">
						{error && (
							<Alert variant="destructive">
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						)}

						<div className="space-y-8">
							<Label htmlFor="email">이메일</Label>
							<Input
								id="email"
								type="email"
								placeholder="이메일을 입력하세요"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						<div className="space-y-8">
							<Label htmlFor="password">비밀번호</Label>
							<Input
								id="password"
								type="password"
								placeholder="비밀번호를 입력하세요"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<div className="flex items-center space-x-8">
							<Checkbox
								id="remember"
								checked={rememberMe}
								onCheckedChange={(checked) => setRememberMe(checked as boolean)}
							/>
							<Label htmlFor="remember" className="text-14">
								로그인 상태 유지
							</Label>
						</div>

						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? '로그인 중...' : '로그인'}
						</Button>
					</form>

					<div className="mt-24 rounded-lg bg-blue-50 p-16">
						<p className="text-xl leading-24 text-blue-700">
							<strong>데모 계정:</strong>
							<br />
							이메일: admin@consulting.com
							<br />
							비밀번호: admin123
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;
