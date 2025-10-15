import { Search, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetTags } from '@/apis/dashboard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TagsFilterModalProps {
	closeModal: () => void;
}

const TagsFilterModal = ({ closeModal }: TagsFilterModalProps) => {
	const { data: tagsData } = useGetTags();

	const [searchParams, setSearchParams] = useSearchParams();

	const [excludeTags, setExcludeTags] = useState<string[]>(
		searchParams.get('excludeTags') ? (searchParams.get('excludeTags')?.split('|') as string[]) : []
	);

	const [searchTerm, setSearchTerm] = useState<string>('');

	// 통계 계산
	const statistics = useMemo(() => {
		if (!tagsData) return { total: 0, excluded: 0, included: 0 };

		const total = tagsData.reduce((sum, category) => sum + category.data.length, 0);
		const excluded = excludeTags.length;
		const included = total - excluded;

		return { total, excluded, included };
	}, [tagsData, excludeTags]);

	// 태그 선택/해제 토글
	const toggleTag = (tagName: string) => {
		setExcludeTags((prev) => {
			if (prev.includes(tagName)) {
				return prev.filter((tag) => tag !== tagName);
			} else {
				return [...prev, tagName];
			}
		});
	};

	// 카테고리별 전체 선택/해제
	const toggleCategoryAll = (categoryData: string[]) => {
		const allExcluded = categoryData.every((tag) => excludeTags.includes(tag));

		if (allExcluded) {
			// 모두 제외된 상태 -> 모두 포함
			setExcludeTags((prev) => prev.filter((tag) => !categoryData.includes(tag)));
		} else {
			// 일부 또는 모두 포함된 상태 -> 모두 제외
			setExcludeTags((prev) => [...new Set([...prev, ...categoryData])]);
		}
	};

	// 전체 초기화
	const resetAll = () => {
		setExcludeTags([]);
	};

	// 카테고리별 통계
	const getCategoryStats = (categoryData: string[]) => {
		const excluded = categoryData.filter((tag) => excludeTags.includes(tag)).length;
		const included = categoryData.length - excluded;
		return { total: categoryData.length, excluded, included };
	};

	const handleApply = () => {
		const params = Object.fromEntries(searchParams.entries());

		setSearchParams({ ...params, excludeTags: excludeTags.join('|') });

		closeModal();
	};

	return (
		<DialogContent className="flex h-[90vh] max-h-[90vh] w-[95vw] max-w-6xl flex-col overflow-hidden p-0">
			{/* 고정 헤더 */}
			<DialogHeader className="bg-background flex-shrink-0 border-b p-16 pb-12">
				<div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
					<div className="flex-1">
						<DialogTitle className="text-3xl">태그 필터 관리</DialogTitle>
						<p className="text-muted-foreground mt-2 text-lg">
							제외할 태그를 선택하세요. 선택된 태그는 대시보드에서 필터링됩니다.
						</p>
					</div>
					<div className="flex flex-wrap items-center gap-4 lg:gap-8">
						<Badge variant="outline" className="flex-shrink-0 text-lg">
							<Eye className="mr-2 h-12 w-12 lg:mr-4 lg:h-16 lg:w-16" />
							포함: {statistics.included}개
						</Badge>
						<Badge variant="destructive" className="flex-shrink-0 text-lg">
							<EyeOff className="mr-2 h-12 w-12 lg:mr-4 lg:h-16 lg:w-16" />
							제외: {statistics.excluded}개
						</Badge>
					</div>
				</div>
			</DialogHeader>

			{/* 검색 및 컨트롤 - 고정 */}
			<div className="bg-background flex-shrink-0 border-b p-16 py-12">
				<div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12">
					<div className="relative flex-1">
						<Search className="text-muted-foreground absolute top-1/2 left-12 h-16 w-16 -translate-y-1/2" />
						<Input
							placeholder="태그 검색..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-40"
						/>
					</div>
					<Button
						variant="outline"
						onClick={resetAll}
						disabled={excludeTags.length === 0}
						size="sm"
						className="w-full sm:w-auto"
					>
						<RotateCcw className="mr-8 h-16 w-16" />
						전체 초기화
					</Button>
				</div>
			</div>

			{/* 스크롤 가능한 컨텐츠 영역 */}
			<div className="flex-1 overflow-y-auto p-16">
				<div className="space-y-16 lg:space-y-24">
					{tagsData?.map((category) => {
						const filteredData = category.data.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

						// 검색 결과가 없으면 카테고리 자체를 숨김
						if (filteredData.length === 0) return null;

						return (
							<CategorySection
								key={category.tag}
								category={{
									...category,
									data: filteredData,
								}}
								excludedTags={excludeTags}
								onToggleTag={toggleTag}
								onToggleCategoryAll={toggleCategoryAll}
								getCategoryStats={getCategoryStats}
							/>
						);
					})}
				</div>
			</div>

			{/* 고정 푸터 */}
			<DialogFooter className="bg-background flex-shrink-0 border-t p-16 pt-12">
				<div className="flex w-full flex-col gap-12 sm:flex-row sm:items-center sm:justify-between">
					<div className="text-muted-foreground text-center text-lg sm:text-left">
						총 {statistics.total}개 태그 중 {statistics.excluded}개 제외됨
					</div>
					<div className="flex justify-center gap-8 sm:justify-end">
						<DialogClose asChild>
							<Button variant="outline" onClick={closeModal} className="flex-1 sm:flex-none">
								취소
							</Button>
						</DialogClose>
						<Button onClick={handleApply} className="flex-1 sm:flex-none">
							적용
						</Button>
					</div>
				</div>
			</DialogFooter>
		</DialogContent>
	);
};

// 카테고리 섹션 컴포넌트
interface CategorySectionProps {
	category: { tag: string; data: string[] };
	excludedTags: string[];
	onToggleTag: (tag: string) => void;
	onToggleCategoryAll: (categoryData: string[]) => void;
	getCategoryStats: (categoryData: string[]) => { total: number; excluded: number; included: number };
}

const CategorySection = ({
	category,
	excludedTags,
	onToggleTag,
	onToggleCategoryAll,
	getCategoryStats,
}: CategorySectionProps) => {
	const stats = getCategoryStats(category.data);
	const allExcluded = category.data.every((tag) => excludedTags.includes(tag));

	return (
		<div className="space-y-8 lg:space-y-12">
			<div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-8 lg:gap-12">
					<h3 className="text-2xl font-semibold">{category.tag}</h3>
					<Badge variant="outline" className="text-lg">
						{stats.included}/{stats.total}개 포함
					</Badge>
				</div>
				<Button
					variant="outline"
					size="sm"
					onClick={() => onToggleCategoryAll(category.data)}
					className="w-full sm:w-auto"
				>
					{allExcluded ? '전체 포함' : '전체 제외'}
				</Button>
			</div>

			<div className="xs:grid-cols-3 grid grid-cols-2 gap-6 sm:grid-cols-4">
				{category.data.map((tagName) => {
					const isExcluded = excludedTags.includes(tagName);
					return (
						<div
							key={tagName}
							className={cn(
								'flex cursor-pointer items-center gap-6 rounded-lg border p-8 transition-all hover:shadow-md lg:gap-8 lg:p-12',
								'min-h-[48px] touch-manipulation', // 모바일 터치 개선
								isExcluded ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'
							)}
							onClick={() => onToggleTag(tagName)}
						>
							<Checkbox
								checked={!isExcluded}
								onChange={() => onToggleTag(tagName)}
								className="pointer-events-none flex-shrink-0"
							/>
							<span className="flex-1 truncate text-lg font-medium" title={tagName}>
								{tagName}
							</span>
							{isExcluded ? (
								<EyeOff className="h-14 w-14 flex-shrink-0 text-red-500 lg:h-16 lg:w-16" />
							) : (
								<Eye className="h-14 w-14 flex-shrink-0 text-green-500 lg:h-16 lg:w-16" />
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TagsFilterModal;
