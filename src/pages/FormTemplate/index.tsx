import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useSaveFormTemplate } from '@/apis/form';
import { FormTemplateData } from '@/apis/form/type';
import DocumentIcon from '@/assets/document.svg?react';
import { cn } from '@/lib/utils';

import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Textarea } from '../../components/ui/textarea';

const FormTemplatePage = () => {
	const navigate = useNavigate();

	const {
		watch,
		register,
		setValue,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormTemplateData>({
		defaultValues: {
			phone: '',
			overallSat: 0,
			answerAccuracy: 0,
			previousContact: '',
			freeComment: '',
		},
		resolver: zodResolver(
			z.object({
				phone: z.string().min(1, '전화번호를 입력해주세요.'),
				overallSat: z.number().min(1, '상담 만족도를 선택해주세요.').max(5, '상담 만족도를 선택해주세요.'),
				answerAccuracy: z.number().min(1, '대응 만족도를 선택해주세요.').max(5, '대응 만족도를 선택해주세요.'),
				previousContact: z.string().min(1, '답변을 선택해주세요.'),
				freeComment: z.string().optional(),
			})
		),
	});

	const { mutateAsync: mutateSaveFormTemplate, isPending } = useSaveFormTemplate();

	const onSubmit: SubmitHandler<FormTemplateData> = async (data) => {
		const res = await mutateSaveFormTemplate(data);
		console.log(res);
		reset();
		navigate('/form-success');
	};

	const onError: SubmitErrorHandler<FormTemplateData> = (errors) => {
		console.log('Form errors:', errors);
	};

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
				<Card className="gap-16">
					<CardHeader>
						<p className="text-xl text-red-500">* 표시는 필수 질문입니다.</p>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-32">
							{/* Personal Information */}
							<div className="space-y-8">
								<Label className="text-2xl" htmlFor="phone">
									전화번호를 입력해주세요 <div className="pb-4 text-xl text-red-500">*</div>
								</Label>
								<Input id="phone" placeholder="전화번호" aria-invalid={!!errors.phone} {...register('phone')} />
								{errors.phone && <p className="text-xl text-red-500">{errors.phone.message}</p>}
							</div>

							<div className="space-y-8">
								<Label className="text-2xl" htmlFor="phone">
									고객센터 상담에 전반적으로 얼마나 만족하시나요? <div className="pb-4 text-xl text-red-500">*</div>
								</Label>
								<div
									className={cn(
										'rounded-lg border bg-white p-16',
										'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
									)}
									aria-invalid={!!errors.overallSat}
								>
									<div className="item-center mt-12 flex justify-between">
										<span className="pt-32 text-lg text-gray-600">매우 불만족</span>
										<RadioGroup
											className="flex w-[60%] items-center justify-between"
											orientation="horizontal"
											value={watch('overallSat').toString()}
											onValueChange={(value) => setValue('overallSat', Number(value), { shouldValidate: true })}
										>
											{[1, 2, 3, 4, 5].map((n) => (
												<div key={`satisfaction-2-${n}`} className="flex flex-col items-center gap-12">
													<label htmlFor={`satisfaction-2-${n}`}>{n}</label>
													<RadioGroupItem value={`${n}`} id={`satisfaction-2-${n}`} />
												</div>
											))}
										</RadioGroup>
										<span className="pt-32 text-lg text-gray-600">매우 만족</span>
									</div>
								</div>
								{errors.overallSat && <p className="text-xl text-red-500">{errors.overallSat.message}</p>}
							</div>

							<div className="space-y-8">
								<Label className="text-2xl" htmlFor="phone">
									고객센터가 제공한 답변이 문의하신 내용에 정확하게 대응되었나요?
									<div className="pb-4 text-xl text-red-500">*</div>
								</Label>
								<div
									className={cn(
										'rounded-lg border bg-white p-16',
										'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
									)}
									aria-invalid={!!errors.answerAccuracy}
								>
									<div className="item-center mt-12 flex justify-between">
										<span className="pt-32 text-lg text-gray-600">매우 불만족</span>
										<RadioGroup
											className="flex w-[60%] items-center justify-between"
											orientation="horizontal"
											value={watch('answerAccuracy').toString()}
											onValueChange={(value) => setValue('answerAccuracy', Number(value), { shouldValidate: true })}
										>
											{[1, 2, 3, 4, 5].map((n) => (
												<div key={`satisfaction-2-${n}`} className="flex flex-col items-center gap-12">
													<label htmlFor={`satisfaction-2-${n}`}>{n}</label>
													<RadioGroupItem value={`${n}`} id={`satisfaction-2-${n}`} />
												</div>
											))}
										</RadioGroup>
										<span className="pt-32 text-lg text-gray-600">매우 만족</span>
									</div>
								</div>
								{errors.answerAccuracy && <p className="text-xl text-red-500">{errors.answerAccuracy.message}</p>}
							</div>

							{/* Urgency */}
							<div className="space-y-16">
								<Label className="text-2xl">
									이번 문의와 같은 내용을 고객센터에 예전에 문의하신 적이 있으신가요?
									<div className="pb-4 text-xl text-red-500">*</div>
								</Label>
								<RadioGroup
									className="flex flex-col gap-16"
									value={watch('previousContact')}
									onValueChange={(value) => setValue('previousContact', value, { shouldValidate: true })}
								>
									<div className="flex items-center space-x-8">
										<RadioGroupItem value="high" id="high" />
										<Label htmlFor="high">예, 동일한 문의를 한 적 있습니다.</Label>
									</div>
									<div className="flex items-center space-x-8">
										<RadioGroupItem value="medium" id="medium" />
										<Label htmlFor="medium">아니요, 이번이 처음입니다.</Label>
									</div>
									<div className="flex items-center space-x-8">
										<RadioGroupItem value="low" id="low" />
										<Label htmlFor="low">잘 모르겠습니다.</Label>
									</div>
								</RadioGroup>
								{errors.previousContact && <p className="text-xl text-red-500">{errors.previousContact.message}</p>}
							</div>

							<div className="space-y-8">
								<Label htmlFor="description" className="text-2xl">
									상담을 받으시며 느낀 점이나 개선되었으면 하는 부분이 있다면 자유롭게 남겨 주세요.
								</Label>
								<Textarea id="description" {...register('freeComment')} placeholder="내용" rows={5} />
							</div>

							<Button type="submit" className="w-full" size="lg" disabled={isPending}>
								{isPending ? <Loader2 className="size-24 animate-spin" /> : '제출'}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default FormTemplatePage;
