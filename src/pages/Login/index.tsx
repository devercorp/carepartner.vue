import { zodResolver } from '@hookform/resolvers/zod';
import { BarChart3 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';

import { useLoginApi } from '@/apis/auth';
import { LoginForm } from '@/apis/auth/type';

import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

const LoginPage = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>({
		defaultValues: {
			id: '',
			password: '',
		},
		resolver: zodResolver(
			z.object({
				id: z.string().min(1, '아이디를 입력해주세요.'),
				password: z.string().min(1, '비밀번호를 입력해주세요.'),
			})
		),
	});

	const { mutateAsync: mutateLogin, isPending } = useLoginApi();

	const onSubmit: SubmitHandler<LoginForm> = async (data) => {
		const res = await mutateLogin(data);

		console.log(res);
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
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
						<div className="space-y-8">
							<Label htmlFor="email">아이디</Label>
							<Input
								id="email"
								type="text"
								placeholder="아이디를 입력하세요"
								aria-invalid={!!errors.id}
								{...register('id')}
							/>
							{errors.id && <p className="text-xl text-red-500">{errors.id.message}</p>}
						</div>

						<div className="space-y-8">
							<Label htmlFor="password">비밀번호</Label>
							<Input
								id="password"
								type="password"
								placeholder="비밀번호를 입력하세요"
								aria-invalid={!!errors.password}
								{...register('password')}
							/>
							{errors.password && <p className="text-xl text-red-500">{errors.password.message}</p>}
						</div>

						{/* <div className="flex items-center space-x-8">
							<Checkbox
								id="remember"
								checked={rememberMe}
								onCheckedChange={(checked) => setRememberMe(checked as boolean)}
							/>
							<Label htmlFor="remember" className="text-14">
								로그인 상태 유지
							</Label>
						</div> */}

						<Button type="submit" className="w-full" disabled={isPending}>
							{isPending ? '로그인 중...' : '로그인'}
						</Button>
					</form>

					<div className="mt-24 rounded-lg bg-blue-50 p-16">
						<p className="text-xl leading-24 text-blue-700">
							<strong>테스트 계정:</strong>
							<br />
							이메일: admin
							<br />
							비밀번호: 1234
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;
