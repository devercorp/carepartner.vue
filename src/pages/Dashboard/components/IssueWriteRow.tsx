import { zodResolver } from '@hookform/resolvers/zod';
import { Edit, ExternalLink, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';

import { fetchGetIssueCnt } from '@/apis/issue';
import { IssueWriteFormType } from '@/apis/issue/type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { TAG_TABLE } from '@/constants/tags';

interface IssueWriteRowProps {
	data: IssueWriteFormType;
	index: number;
	removeRow: (index: number) => void;
	onSave: (index: number, data: IssueWriteFormType) => void;
	canDelete: boolean;
	startDate: string;
	isCategory?: boolean;
}

const IssueWriteRow = ({
	data,
	index,
	removeRow,
	onSave,
	canDelete,
	startDate,
	isCategory = false,
}: IssueWriteRowProps) => {
	// 새로운 행(issueReportId가 없는 경우)은 자동으로 편집 모드
	const [isEdit, setIsEdit] = useState<boolean>(!data?.issueReportId);

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		reset,
		formState: { errors },
	} = useForm<IssueWriteFormType>({
		defaultValues: data,
		resolver: zodResolver(
			z.object({
				issueReportId: z.number().optional(),
				dailyType: z.enum(['daily', 'weekly', 'monthly']),
				category: z.string().min(1, '대분류를 선택해주세요'),
				midCategory: z.string().min(1, '중분류를 선택해주세요'),
				subCategory: z.string().min(1, '소분류를 선택해주세요'),
				orgCnt: z.number(),
				issueDetail: z.string().optional(),
				links: z.array(z.string()).optional(),
				opinion: z.string().optional(),
			})
		),
	});

	// data prop이 변경될 때 폼 값 업데이트
	useEffect(() => {
		reset(data);
	}, [data, reset]);

	// watch를 사용하여 현재 폼 값 추적
	const watchedCategory = watch('category');
	const watchedMidCategory = watch('midCategory');
	const watchedSubCategory = watch('subCategory');
	const watchedLinks = watch('links') || [''];

	// 카테고리 연계 업데이트 (대분류 변경 시 하위 분류 초기화)
	const handleCategoryChange = (value: string) => {
		setValue('category', value);
		setValue('midCategory', '');
		setValue('subCategory', '');
		setValue('orgCnt', 0);
	};

	// 중분류 변경 시 소분류 초기화
	const handleMidCategoryChange = (value: string) => {
		setValue('midCategory', value);
		setValue('subCategory', '');
		setValue('orgCnt', 0);
	};

	// links 배열이 없으면 초기화
	if (!data?.links || data.links.length === 0) {
		data.links = [''];
	}

	// 링크 렌더링 함수
	const renderLink = (linkText: string) => {
		if (!linkText) return null;

		// URL 패턴 검사 (http://, https://, www. 시작하는 텍스트)
		const urlPattern = /^(https?:\/\/|www\.)/i;
		const isUrl = urlPattern.test(linkText);

		if (isUrl) {
			const fullUrl = linkText.startsWith('www.') ? `https://${linkText}` : linkText;
			return (
				<a
					href={fullUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-4 text-blue-600 underline hover:text-blue-800"
				>
					{linkText}
					<ExternalLink className="h-12 w-12" />
				</a>
			);
		}

		return <span>{linkText}</span>;
	};

	// 선택된 대분류에 따른 중분류 옵션
	const getMidCategories = () => {
		const selectedCategory = TAG_TABLE.find((cat) => cat.name === watchedCategory);
		return selectedCategory?.sub || [];
	};

	// 선택된 중분류에 따른 소분류 옵션
	const getSubCategories = () => {
		const selectedCategory = TAG_TABLE.find((cat) => cat.name === watchedCategory);
		const selectedMidCategory = selectedCategory?.sub.find((mid) => mid.name === watchedMidCategory);
		return selectedMidCategory?.sub || [];
	};

	const handleSubCategoryChange = async (value: string) => {
		setValue('subCategory', value);

		try {
			const res = await fetchGetIssueCnt({
				startDate: startDate,
				dailyType: data?.dailyType || '',
				category: watchedCategory || '',
				midCategory: watchedMidCategory || '',
				subCategory: value,
			});

			setValue('orgCnt', res.data.data.count);
		} catch (error) {
			console.error('건수 조회 실패:', error);
			setValue('orgCnt', 0);
		}
	};

	// 링크 추가
	const addLinkField = () => {
		const currentLinks = watchedLinks;
		if (currentLinks.length < 4) {
			setValue('links', [...currentLinks, '']);
		}
	};

	// 링크 삭제
	const removeLinkField = (linkIndex: number) => {
		const currentLinks = watchedLinks;
		if (currentLinks.length > 1) {
			const newLinks = currentLinks.filter((_, idx) => idx !== linkIndex);
			setValue('links', newLinks);
		}
	};

	// 링크 값 변경
	const handleLinkChange = (linkIndex: number, value: string) => {
		const currentLinks = watchedLinks;
		const newLinks = [...currentLinks];
		newLinks[linkIndex] = value;
		setValue('links', newLinks);
	};

	// 폼 제출 핸들러
	const onSubmit: SubmitHandler<IssueWriteFormType> = async (formData) => {
		console.log('Form Data:', formData);

		try {
			// 부모 컴포넌트의 onSave 호출
			await onSave(index, formData);

			// 저장 성공 시 편집 모드 해제
			setIsEdit(false);
		} catch (error) {
			console.error('저장 실패:', error);
		}
	};

	const onError: SubmitErrorHandler<IssueWriteFormType> = (error) => {
		console.log('Error:', error);
		alert('입력값을 확인해주세요.');
	};

	// 취소 핸들러
	const handleCancel = () => {
		// 새로운 행인 경우 삭제
		if (!data?.issueReportId) {
			removeRow(index);
		} else {
			// 기존 행인 경우 원래 데이터로 복원
			setValue('category', data.category);
			setValue('midCategory', data.midCategory);
			setValue('subCategory', data.subCategory);
			setValue('orgCnt', data.orgCnt);
			setValue('issueDetail', data.issueDetail || '');
			setValue('links', data.links || ['']);
			setValue('opinion', data.opinion || '');
			setIsEdit(false);
		}
	};

	return (
		<TableRow>
			{/* 대분류 */}
			<TableCell>
				<div className="space-y-8">
					<Select
						value={watchedCategory || ''}
						onValueChange={(value) => handleCategoryChange(value)}
						disabled={isCategory || !isEdit}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="선택" />
						</SelectTrigger>
						<SelectContent>
							{TAG_TABLE.map((category) => (
								<SelectItem key={category.name} value={category.name}>
									{category.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors?.category && <p className="text-md text-red-500">{errors.category.message}</p>}
				</div>
			</TableCell>

			{/* 중분류 */}
			<TableCell>
				<div className="space-y-8">
					<Select
						value={watchedMidCategory || ''}
						onValueChange={(value) => handleMidCategoryChange(value)}
						disabled={!watchedCategory || !isEdit}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="선택" />
						</SelectTrigger>
						<SelectContent>
							{getMidCategories().map((midCat) => (
								<SelectItem key={midCat.name} value={midCat.name}>
									{midCat.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors?.midCategory && <p className="text-md text-red-500">{errors.midCategory.message}</p>}
				</div>
			</TableCell>

			{/* 소분류 */}
			<TableCell>
				<div className="space-y-8">
					<Select
						value={watchedSubCategory || ''}
						onValueChange={handleSubCategoryChange}
						disabled={!watchedCategory || !watchedMidCategory || !isEdit}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="선택" />
						</SelectTrigger>
						<SelectContent>
							{getSubCategories().map((subCat) => (
								<SelectItem key={subCat} value={subCat}>
									{subCat}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{errors?.subCategory && <p className="text-md text-red-500">{errors.subCategory.message}</p>}
				</div>
			</TableCell>

			{/* 기간별 건수 조회 */}
			<TableCell>
				<Input
					className="text-end"
					placeholder="건수"
					min="0"
					readOnly
					disabled={!isEdit}
					{...register(`orgCnt`, {
						valueAsNumber: true,
					})}
				/>
			</TableCell>

			{/* Issue 상세 */}
			<TableCell>
				<Textarea
					placeholder="이슈 상세 내용을 입력하세요"
					className="[field-sizing:content] min-h-120 min-w-200 resize-none"
					disabled={!isEdit}
					{...register(`issueDetail`)}
				/>
			</TableCell>

			{/* 링크 삽입 */}
			<TableCell>
				<div className="space-y-8">
					<div className="space-y-4">
						{watchedLinks.map((link, linkIndex) => (
							<div key={linkIndex} className="flex items-start gap-4">
								<div className="flex-1 space-y-8">
									<Input
										value={link}
										onChange={(e) => handleLinkChange(linkIndex, e.target.value)}
										placeholder={`링크 ${linkIndex + 1}`}
										disabled={!isEdit}
									/>
									{!isEdit && (
										<div className="text-md min-h-[20px] max-w-300 min-w-200 truncate text-gray-600">
											{renderLink(link || '')}
										</div>
									)}
								</div>
								{watchedLinks.length > 1 && isEdit && (
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => removeLinkField(linkIndex)}
										className="mt-4 h-32 w-32 p-0 text-gray-400 hover:text-red-500"
									>
										<X className="h-16 w-16" />
									</Button>
								)}
							</div>
						))}
						{watchedLinks.length < 4 && isEdit && (
							<Button type="button" variant="outline" size="sm" onClick={addLinkField} className="w-full">
								<Plus className="mr-4 h-14 w-14" />
								링크 추가
							</Button>
						)}
					</div>
				</div>
			</TableCell>

			{/* 의견 */}
			<TableCell>
				<Textarea
					placeholder="개선 방향이나 의견을 입력하세요"
					className="[field-sizing:content] min-h-120 min-w-200 resize-none"
					disabled={!isEdit}
					{...register(`opinion`)}
				/>
			</TableCell>

			{/* 액션 버튼 */}
			<TableCell className="text-center">
				{isEdit ? (
					<div className="flex flex-col gap-4">
						<Button
							type="button"
							onClick={handleSubmit(onSubmit, onError)}
							variant="ghost"
							size="sm"
							className="text-blue-500 hover:text-blue-700"
						>
							{data?.issueReportId ? '수정' : '등록'}
						</Button>
						<Button
							type="button"
							onClick={handleCancel}
							variant="ghost"
							size="sm"
							className="text-gray-500 hover:text-gray-700"
						>
							취소
						</Button>
						{data?.issueReportId && (
							<Button
								type="button"
								onClick={() => removeRow(index)}
								variant="ghost"
								size="sm"
								className="text-red-500 hover:text-red-700"
								disabled={!canDelete}
							>
								<Trash2 className="h-16 w-16" />
							</Button>
						)}
					</div>
				) : (
					<Button
						type="button"
						onClick={() => setIsEdit(true)}
						variant="ghost"
						size="sm"
						className="text-blue-500 hover:text-blue-700"
					>
						<Edit className="h-16 w-16" />
					</Button>
				)}
			</TableCell>
		</TableRow>
	);
};

export default IssueWriteRow;
