import { CheckCircle } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

const FormSuccessPage = () => {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 p-16">
			<Card className="w-full max-w-xl">
				<CardContent className="p-32 text-center">
					<div className="mb-24">
						<div className="mx-auto mb-16 flex h-64 w-64 items-center justify-center rounded-full bg-green-100">
							<CheckCircle className="h-32 w-32 text-green-600" />
						</div>
						<h2 className="mb-8 text-4xl font-semibold">제출 완료</h2>
						<p className="text-2xl text-gray-600">
							더 나은 서비스를 위해 노력하겠습니다.
							<br />
							감사합니다.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default FormSuccessPage;
