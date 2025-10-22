import { useMemo } from 'react';

import { CategoryType } from '@/apis/dashboard/type';
import { BarChart } from '@/components/charts/BarChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DEFAULT_CHART_COLORS } from '@/constants/colors';
import { cn } from '@/lib/utils';

interface TagChartBoxProps {
	categoryType: CategoryType;
	data: {
		midCategory: string;
		subs: { subCategory: string; cnt: number; prevCnt?: number }[];
	}[];
	currentLabel?: string;
	compareLabel?: string;
}

const TagChartBox = ({ categoryType, data, currentLabel, compareLabel }: TagChartBoxProps) => {
	const formatData = useMemo(() => {
		if (categoryType === 'normal') {
			const normalData = {
				midCategory: '일반',
				subs: [] as { subCategory: string; cnt: number; prevCnt?: number }[],
			};

			for (const item of data) {
				for (const sub of item.subs) {
					normalData.subs.push({
						subCategory: sub.subCategory,
						cnt: sub.cnt,
						...(sub.prevCnt && { prevCnt: sub.prevCnt }),
					});
				}
			}

			return [normalData];
		}

		return data;
	}, [categoryType, data]);

	return (
		<div className={cn('grid grid-cols-1 gap-24')}>
			{formatData?.map((item) => (
				<Card key={item.midCategory}>
					<CardHeader>
						<CardTitle>{item.midCategory} 문의</CardTitle>
					</CardHeader>
					<CardContent>
						{item?.subs?.length > 0 ? (
							<BarChart
								data={item?.subs ?? []}
								dataKey="cnt"
								nameKey="subCategory"
								height={300}
								colors={DEFAULT_CHART_COLORS}
								compareDataKey={item.subs[0]?.prevCnt !== undefined ? 'prevCnt' : undefined}
								currentLabel={currentLabel}
								compareLabel={compareLabel}
							/>
						) : (
							<div className="flex h-full items-center justify-center">
								<p className="text-muted-foreground">데이터가 없습니다.</p>
							</div>
						)}
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default TagChartBox;
