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
		searchParams.get('excludeTags') ? (searchParams.get('excludeTags')?.split(',') as string[]) : []
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

		setSearchParams({ ...params, excludeTags: excludeTags.join(',') });

		closeModal();
	};

	return (
		<DialogContent className="flex max-h-[80vh] max-w-6xl flex-col overflow-hidden">
			<DialogHeader className="pb-16">
				<div className="flex items-center justify-between">
					<div>
						<DialogTitle className="text-3xl">태그 필터 관리</DialogTitle>
						<p className="text-muted-foreground mt-4 text-lg">
							제외할 태그를 선택하세요. 선택된 태그는 대시보드에서 필터링됩니다.
						</p>
					</div>
					<div className="flex items-center gap-8">
						<Badge variant="outline" className="text-lg">
							<Eye className="mr-4 h-16 w-16" />
							포함: {statistics.included}개
						</Badge>
						<Badge variant="destructive" className="text-lg">
							<EyeOff className="mr-4 h-16 w-16" />
							제외: {statistics.excluded}개
						</Badge>
					</div>
				</div>
			</DialogHeader>

			{/* 검색 및 컨트롤 */}
			<div className="flex items-center gap-12 border-b pb-16">
				<div className="relative flex-1">
					<Search className="text-muted-foreground absolute top-1/2 left-12 h-16 w-16 -translate-y-1/2" />
					<Input
						placeholder="태그 검색..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="pl-40"
					/>
				</div>
				<Button variant="outline" onClick={resetAll} disabled={excludeTags.length === 0}>
					<RotateCcw className="mr-8 h-16 w-16" />
					전체 초기화
				</Button>
			</div>

			{/* 카테고리 탭 */}
			<div className="mt-16 flex flex-col gap-24 overflow-y-auto">
				{tagsData?.map((category) => (
					<CategorySection
						key={category.tag}
						category={{
							...category,
							data: category.data.filter((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
						}}
						excludedTags={excludeTags}
						onToggleTag={toggleTag}
						onToggleCategoryAll={toggleCategoryAll}
						getCategoryStats={getCategoryStats}
					/>
				))}
			</div>

			<DialogFooter className="border-t pt-16">
				<div className="flex w-full items-center justify-between">
					<div className="text-muted-foreground text-lg">
						총 {statistics.total}개 태그 중 {statistics.excluded}개 제외됨
					</div>
					<div className="flex gap-8">
						<DialogClose asChild>
							<Button variant="outline" onClick={closeModal}>
								취소
							</Button>
						</DialogClose>
						<Button onClick={handleApply}>적용</Button>
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
		<div className="space-y-12">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-12">
					<h3 className="text-2xl font-semibold">{category.tag}</h3>
					<Badge variant="outline">
						{stats.included}/{stats.total}개 포함
					</Badge>
				</div>
				<Button variant="outline" size="sm" onClick={() => onToggleCategoryAll(category.data)}>
					{allExcluded ? '전체 포함' : '전체 제외'}
				</Button>
			</div>

			<div className="grid grid-cols-4 gap-8">
				{category.data.map((tagName) => {
					const isExcluded = excludedTags.includes(tagName);
					return (
						<div
							key={tagName}
							className={cn(
								'flex cursor-pointer items-center gap-8 rounded-lg border p-12 transition-all hover:shadow-md',
								isExcluded ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'
							)}
							onClick={() => onToggleTag(tagName)}
						>
							<Checkbox checked={!isExcluded} onChange={() => onToggleTag(tagName)} className="pointer-events-none" />
							<span className="flex-1 truncate text-lg font-medium" title={tagName}>
								{tagName}
							</span>
							{isExcluded ? (
								<EyeOff className="h-16 w-16 text-red-500" />
							) : (
								<Eye className="h-16 w-16 text-green-500" />
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default TagsFilterModal;
