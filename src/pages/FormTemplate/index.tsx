import { CheckCircle, FileText } from 'lucide-react';
import { useState } from 'react';

import DocumentIcon from '@/assets/document.svg?react';

import { Alert, AlertDescription } from '../../components/ui/alert';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Checkbox } from '../../components/ui/checkbox';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';

const FormTemplatePage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		category: '',
		urgency: '',
		subject: '',
		description: '',
		services: [] as string[],
		agreement: false,
	});
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleServiceChange = (service: string, checked: boolean) => {
		if (checked) {
			setFormData((prev) => ({
				...prev,
				services: [...prev.services, service],
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				services: prev.services.filter((s) => s !== service),
			}));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would normally send the data to your API
		console.log('Form submitted:', formData);
		setIsSubmitted(true);
	};

	if (isSubmitted) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50 p-16">
				<Card className="w-full max-w-xl">
					<CardContent className="p-32 text-center">
						<div className="mb-24">
							<div className="mx-auto mb-16 flex h-64 w-64 items-center justify-center rounded-full bg-green-100">
								<CheckCircle className="h-32 w-32 text-green-600" />
							</div>
							<h2 className="mb-8 text-2xl font-semibold">접수 완료</h2>
							<p className="text-xl text-gray-600">
								상담 요청이 성공적으로 접수되었습니다.
								<br />
								빠른 시간 내에 연락드리겠습니다.
							</p>
						</div>
						<Button onClick={() => setIsSubmitted(false)} className="w-full">
							다른 상담 신청하기
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-emerald-50 p-16">
			<div className="mx-auto max-w-3xl">
				{/* Header */}
				<Card className="mb-16">
					<div className="bg-white px-24">
						<div className="mx-auto mb-24 flex h-64 w-64 items-center justify-center rounded-full bg-blue-100">
							<DocumentIcon className="h-60 w-60 text-blue-600" />
						</div>
						<h1 className="mb-16 text-4xl font-bold">케어파트너 고객센터 만족도 조사</h1>
						<p className="border-gray-200 bg-white text-start text-2xl text-gray-600">
							안녕하세요, 케어파트너 고객센터입니다.
							<br />
							더 나은 상담 서비스를 위해 간단한 만족도 조사를 진행하고 있습니다.
							<br />
							답변은 익명으로 처리되며, 약 10초 정도 소요됩니다.
							<br />
							<br />
							여러분의 소중한 의견은 서비스 개선에 큰 도움이 됩니다.
							<br />
							잠시 시간 내어 응답해 주시면 감사하겠습니다 😊
						</p>
					</div>
				</Card>

				{/* Form */}
				<Card>
					<CardHeader>
						<CardTitle className="text-2xl">기본 정보</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-24">
							{/* Personal Information */}
							<div className="grid grid-cols-1 gap-16 md:grid-cols-2">
								<div className="space-y-8">
									<Label htmlFor="name">이름 *</Label>
									<Input
										id="name"
										value={formData.name}
										onChange={(e) =>
											setFormData({
												...formData,
												name: e.target.value,
											})
										}
										placeholder="성함을 입력하세요"
										required
									/>
								</div>
								<div className="space-y-8">
									<Label htmlFor="phone">연락처 *</Label>
									<Input
										id="phone"
										value={formData.phone}
										onChange={(e) =>
											setFormData({
												...formData,
												phone: e.target.value,
											})
										}
										placeholder="전화번호를 입력하세요"
										required
									/>
								</div>
							</div>

							<div className="space-y-8">
								<Label htmlFor="email">이메일 *</Label>
								<Input
									id="email"
									type="email"
									value={formData.email}
									onChange={(e) =>
										setFormData({
											...formData,
											email: e.target.value,
										})
									}
									placeholder="이메일 주소를 입력하세요"
									required
								/>
							</div>

							{/* Category Selection */}
							<div className="space-y-8">
								<Label>상담 분야 *</Label>
								<Select
									value={formData.category}
									onValueChange={(value) =>
										setFormData({
											...formData,
											category: value,
										})
									}
								>
									<SelectTrigger>
										<SelectValue placeholder="상담 분야를 선택하세요" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="caregiver">간병인 서비스</SelectItem>
										<SelectItem value="institution">기관 연계</SelectItem>
										<SelectItem value="academy">교육 프로그램</SelectItem>
										<SelectItem value="general">일반 상담</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Urgency */}
							<div className="space-y-8">
								<Label>긴급도 *</Label>
								<RadioGroup
									value={formData.urgency}
									onValueChange={(value) => setFormData({ ...formData, urgency: value })}
									className="flex flex-col gap-8"
								>
									<div className="flex items-center space-x-8">
										<RadioGroupItem value="high" id="high" />
										<Label htmlFor="high">긴급 (24시간 내 연락 필요)</Label>
									</div>
									<div className="flex items-center space-x-8">
										<RadioGroupItem value="medium" id="medium" />
										<Label htmlFor="medium">보통 (2-3일 내 연락)</Label>
									</div>
									<div className="flex items-center space-x-8">
										<RadioGroupItem value="low" id="low" />
										<Label htmlFor="low">일반 (일주일 내 연락)</Label>
									</div>
								</RadioGroup>
							</div>

							{/* Services */}
							<div className="space-y-8">
								<Label>관심 서비스 (중복 선택 가능)</Label>
								<div className="mt-8 grid grid-cols-2 gap-8">
									{['응급 대응', '약물 관리', '일상 돌봄', '이동 지원', '가족 상담', '기관 연계'].map((service) => (
										<div key={service} className="flex items-center space-x-8">
											<Checkbox
												id={service}
												checked={formData.services.includes(service)}
												onCheckedChange={(checked) => handleServiceChange(service, !!checked)}
											/>
											<Label htmlFor={service}>{service}</Label>
										</div>
									))}
								</div>
							</div>

							{/* Subject and Description */}
							<div className="space-y-8">
								<Label htmlFor="subject">상담 제목 *</Label>
								<Input
									id="subject"
									value={formData.subject}
									onChange={(e) =>
										setFormData({
											...formData,
											subject: e.target.value,
										})
									}
									placeholder="상담 제목을 입력하세요"
									required
								/>
							</div>

							<div className="space-y-8">
								<Label htmlFor="description">상세 내용 *</Label>
								<Textarea
									id="description"
									value={formData.description}
									onChange={(e) =>
										setFormData({
											...formData,
											description: e.target.value,
										})
									}
									placeholder="상담받고 싶은 내용을 자세히 작성해 주세요"
									rows={5}
									required
								/>
							</div>

							{/* Agreement */}
							<div className="flex items-center space-x-8">
								<Checkbox
									id="agreement"
									checked={formData.agreement}
									onCheckedChange={(checked) =>
										setFormData({
											...formData,
											agreement: !!checked,
										})
									}
								/>
								<Label htmlFor="agreement" className="text-14">
									개인정보 수집 및 이용에 동의합니다 *
								</Label>
							</div>

							<Alert>
								<AlertDescription>
									입력하신 개인정보는 상담 목적으로만 사용되며, 상담 완료 후 안전하게 삭제됩니다.
								</AlertDescription>
							</Alert>

							<Button type="submit" className="w-full" size="lg" disabled={!formData.agreement}>
								상담 신청하기
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default FormTemplatePage;
