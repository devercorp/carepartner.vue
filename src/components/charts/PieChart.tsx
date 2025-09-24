import { useState } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PieChartProps {
	data: any[];
	dataKey: string;
	nameKey?: string;
	title?: string;
	colors?: string[];
	height?: number;
	showLegend?: boolean;
	showLabels?: boolean;
}

export function PieChart({
	data,
	dataKey,
	nameKey = 'name',
	title,
	height = 300,
	showLegend = true,
	showLabels = true,
}: PieChartProps) {
	// 각 항목의 표시/숨김 상태를 관리
	const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>(
		data.reduce(
			(acc, _, index) => {
				acc[index] = true;
				return acc;
			},
			{} as Record<string, boolean>
		)
	);

	// 표시될 데이터 필터링
	const filteredData = data.filter((_, index) => visibleItems[index]);

	// 전체 데이터 합계
	const totalValue = data.reduce((sum, item) => sum + item[dataKey], 0);
	const visibleTotalValue = filteredData.reduce((sum, item) => sum + item[dataKey], 0);

	// 커스텀 라벨 렌더링 (값과 퍼센트 모두 표시)
	const renderCustomLabel = (entry: any) => {
		const percent = ((entry.value / visibleTotalValue) * 100).toFixed(1);
		return `${entry.value}\n(${percent}%)`;
	};

	// 레이블 클릭 핸들러
	const handleLabelClick = (index: number) => {
		setVisibleItems((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	// 커스텀 레이블 컴포넌트
	const CustomLegend = () => (
		<div className="mt-16 flex flex-wrap justify-center gap-12">
			{data.map((item, index) => (
				<div
					key={index}
					className={`flex cursor-pointer items-center gap-8 transition-opacity duration-200 select-none ${
						visibleItems[index] ? 'opacity-100' : 'opacity-50'
					}`}
					onClick={() => handleLabelClick(index)}
				>
					<div
						className="h-12 w-12 rounded-sm"
						style={{
							backgroundColor: visibleItems[index] ? item.color : '#d1d5db',
						}}
					/>
					<span className="text-xl font-medium">{item[nameKey]}</span>
					<span className="text-lg text-gray-600">
						{item[dataKey]}건 ({(isNaN(item[dataKey] / totalValue) ? 0 : (item[dataKey] / totalValue) * 100).toFixed(1)}
						%)
					</span>
				</div>
			))}
		</div>
	);

	return (
		<div className="space-y-16">
			{title && <h3 className="mb-24 text-center text-2xl font-semibold">{title}</h3>}

			{/* 차트 영역 */}
			<div className="relative">
				<ResponsiveContainer width="100%" height={height}>
					<RechartsPieChart>
						<Pie
							data={filteredData}
							cx="50%"
							cy="50%"
							innerRadius={60}
							outerRadius={100}
							paddingAngle={2}
							dataKey={dataKey}
							label={showLabels ? renderCustomLabel : false}
							labelLine={false}
						>
							{filteredData.map((item, index) => {
								// 원본 데이터에서의 인덱스 찾기
								return <Cell key={`cell-${index}`} fill={item.color} />;
							})}
						</Pie>
						<Tooltip
							formatter={(value: any, name: any) => [`${value}건`, name]}
							labelFormatter={(label) => `${label}`}
							contentStyle={{
								backgroundColor: '#fff',
								border: '1px solid #e2e8f0',
								borderRadius: '8px',
								boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
								fontSize: '14px',
							}}
						/>
					</RechartsPieChart>
				</ResponsiveContainer>

				{/* 차트 중앙에 총합 표시 */}
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="text-center">
						<div className="text-3xl font-bold text-gray-800">{visibleTotalValue.toLocaleString()}</div>
						<div className="text-lg text-gray-500">총 건수</div>
					</div>
				</div>
			</div>

			{/* 커스텀 레이블 (클릭 가능) */}
			{showLegend && <CustomLegend />}
		</div>
	);
}
