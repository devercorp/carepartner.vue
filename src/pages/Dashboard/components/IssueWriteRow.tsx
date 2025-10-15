import { ExternalLink, Plus, Trash2, X } from 'lucide-react';
import { FieldErrors, UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';

import { fetchGetIssueCnt } from '@/apis/issue';
import { IssueWriteFormType } from '@/apis/issue/type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { TAG_TABLE } from '@/constants/tags';

interface IssueWriteForm {
	rows: IssueWriteFormType[];
}

interface IssueWriteRowProps {
	index: number;
	register: UseFormRegister<IssueWriteForm>;
	watch: UseFormWatch<IssueWriteForm>;
	setValue: UseFormSetValue<IssueWriteForm>;
	removeRow: (index: number) => void;
	onCategoryChange: (index: number, value: string) => void;
	onMidCategoryChange: (index: number, value: string) => void;
	canDelete: boolean;
	startDate: string;
	isCategory?: boolean;
	errors?: FieldErrors<IssueWriteFormType>;
}

const IssueWriteRow = ({
	index,
	register,
	watch,
	setValue,
	removeRow,
	onCategoryChange,
	onMidCategoryChange,
	canDelete,
	startDate,
	isCategory = false,
	errors,
}: IssueWriteRowProps) => {
	// 현재 행의 데이터를 watch로 가져오기
	const currentRow = watch(`rows.${index}`);

	// links 배열이 없으면 초기화
	if (!currentRow?.links || currentRow.links.length === 0) {
		setValue(`rows.${index}.links`, ['']);
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
		const selectedCategory = TAG_TABLE.find((cat) => cat.name === currentRow?.category);
		return selectedCategory?.sub || [];
	};

	// 선택된 중분류에 따른 소분류 옵션
	const getSubCategories = () => {
		const selectedCategory = TAG_TABLE.find((cat) => cat.name === currentRow?.category);
		const selectedMidCategory = selectedCategory?.sub.find((mid) => mid.name === currentRow?.midCategory);
		return selectedMidCategory?.sub || [];
	};

	const handleSubCategoryChange = async (value: string) => {
		setValue(`rows.${index}.subCategory`, value);

		const data = await fetchGetIssueCnt({
			startDate: startDate,
			dailyType: currentRow?.dailyType || '',
			category: currentRow?.category || '',
			midCategory: currentRow?.midCategory || '',
			subCategory: value,
		});

		setValue(`rows.${index}.orgCnt`, data.data.data.count);
	};

	// 링크 추가
	const addLinkField = () => {
		const currentLinks = currentRow?.links || [''];
		if (currentLinks.length < 4) {
			setValue(`rows.${index}.links`, [...currentLinks, '']);
		}
	};

	// 링크 삭제
	const removeLinkField = (linkIndex: number) => {
		const currentLinks = currentRow?.links || [''];
		if (currentLinks.length > 1) {
			const newLinks = currentLinks.filter((_, idx) => idx !== linkIndex);
			setValue(`rows.${index}.links`, newLinks);
		}
	};

	// 링크 값 변경
	const handleLinkChange = (linkIndex: number, value: string) => {
		const currentLinks = currentRow?.links || [''];
		const newLinks = [...currentLinks];
		newLinks[linkIndex] = value;
		setValue(`rows.${index}.links`, newLinks);
	};

	return (
		<TableRow>
			{/* 대분류 */}
			<TableCell>
				<div className="space-y-8">
					<Select
						value={currentRow?.category || ''}
						onValueChange={(value) => onCategoryChange(index, value)}
						disabled={isCategory}
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
						value={currentRow?.midCategory || ''}
						onValueChange={(value) => onMidCategoryChange(index, value)}
						disabled={!currentRow?.category}
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
						value={currentRow?.subCategory || ''}
						onValueChange={handleSubCategoryChange}
						disabled={!currentRow?.category || !currentRow?.midCategory}
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
					{...register(`rows.${index}.orgCnt`, {
						valueAsNumber: true,
					})}
					className="text-end"
					placeholder="건수"
					min="0"
					readOnly
				/>
			</TableCell>

			{/* Issue 상세 */}
			<TableCell>
				<Textarea
					{...register(`rows.${index}.issueDetail`)}
					placeholder="이슈 상세 내용을 입력하세요"
					className="min-h-120 min-w-200 resize-none"
				/>
			</TableCell>

			{/* 링크 삽입 */}
			<TableCell>
				<div className="space-y-8">
					<div className="space-y-4">
						{(currentRow?.links || ['']).map((link, linkIndex) => (
							<div key={linkIndex} className="flex items-start gap-4">
								<div className="flex-1 space-y-8">
									<Input
										value={link}
										onChange={(e) => handleLinkChange(linkIndex, e.target.value)}
										placeholder={`링크 ${linkIndex + 1}`}
									/>
									<div className="text-md min-h-[20px] max-w-300 min-w-200 truncate text-gray-600">
										{renderLink(link || '')}
									</div>
								</div>
								{(currentRow?.links?.length || 0) > 1 && (
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
						{(currentRow?.links?.length || 0) < 4 && (
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
					{...register(`rows.${index}.opinion`)}
					placeholder="개선 방향이나 의견을 입력하세요"
					className="min-h-120 min-w-200 resize-none"
				/>
			</TableCell>

			{/* 삭제 버튼 */}
			<TableCell className="text-center">
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
			</TableCell>
		</TableRow>
	);
};

export default IssueWriteRow;
