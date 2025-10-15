import { useState } from 'react';
import {
	BarChart as RechartsBarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell,
} from 'recharts';

interface BarChartProps {
	data: any[];
	dataKey: string;
	nameKey: string;
	title?: string;
	colors?: string[];
	height?: number;
	showLegend?: boolean;
	compareDataKey?: string; // 이전 데이터를 표시할 키
	compareLabel?: string; // 비교 데이터 레이블 (기본: "이전")
	currentLabel?: string; // 현재 데이터 레이블 (기본: "현재")
}

export function BarChart({
	data,
	dataKey,
	nameKey,
	title,
	colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'],
	height = 300,
	showLegend = true,
	compareDataKey,
	compareLabel = '이전',
	currentLabel = '현재',
}: BarChartProps) {
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
	const totalValue = data.reduce((sum, item) => sum + (item[dataKey] || 0), 0);
	const totalCompareValue = compareDataKey ? data.reduce((sum, item) => sum + (item[compareDataKey] || 0), 0) : 0;

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
			{data.map((item, index) => {
				const currentCount = item[dataKey] || 0;
				const prevCount = compareDataKey ? item[compareDataKey] || 0 : null;
				const currentPercent = totalValue > 0 ? ((currentCount / totalValue) * 100).toFixed(1) : 0;
				const prevPercent =
					prevCount !== null && totalCompareValue > 0 ? ((prevCount / totalCompareValue) * 100).toFixed(1) : null;

				return (
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
								backgroundColor: visibleItems[index] ? colors[index % colors.length] : '#d1d5db',
							}}
						/>
						<span className="text-xl font-medium">{item[nameKey]}</span>
						<div className="flex gap-12 text-lg text-gray-600">
							<span>
								{currentCount}건 ({currentPercent}%)
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);

	return (
		<div className="space-y-16">
			{title && <h3 className="mb-24 text-center text-2xl font-semibold">{title}</h3>}

			{/* 차트 영역 */}
			<div>
				<ResponsiveContainer width="100%" height={height}>
					<RechartsBarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
						<XAxis
							dataKey={nameKey}
							tick={{ fontSize: 12 }}
							stroke="#666"
							interval={0}
							angle={0}
							textAnchor="middle"
							height={60}
						/>
						<YAxis tick={{ fontSize: 12 }} stroke="#666" allowDecimals={false} />
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
						{compareDataKey ? (
							<>
								<Bar dataKey={dataKey} name={currentLabel} radius={[4, 4, 0, 0]}>
									{filteredData.map((item, index) => {
										const originalIndex = data.findIndex((originalItem) => originalItem[nameKey] === item[nameKey]);
										return <Cell key={`cell-${index}`} fill={colors[originalIndex % colors.length]} />;
									})}
								</Bar>
								<Bar dataKey={compareDataKey} name={compareLabel} radius={[4, 4, 0, 0]}>
									{filteredData.map((item, index) => {
										const originalIndex = data.findIndex((originalItem) => originalItem[nameKey] === item[nameKey]);
										const baseColor = colors[originalIndex % colors.length];
										// 기본 색상에서 투명도를 낮춘 연한 색상 생성
										return <Cell key={`cell-${index}`} fill={baseColor} opacity={0.4} />;
									})}
								</Bar>
							</>
						) : (
							<Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
								{filteredData.map((item, index) => {
									// 원본 데이터에서의 인덱스 찾기
									const originalIndex = data.findIndex((originalItem) => originalItem[nameKey] === item[nameKey]);
									return <Cell key={`cell-${index}`} fill={colors[originalIndex % colors.length]} />;
								})}
							</Bar>
						)}
					</RechartsBarChart>
				</ResponsiveContainer>
			</div>

			{/* 총 건수 표시 */}
			{totalValue > 0 && (
				<div className="py-8 text-center">
					{compareDataKey ? (
						<div className="flex justify-center gap-24 text-lg text-gray-600">
							<span>
								{currentLabel}: {totalValue.toLocaleString()}건
							</span>
							<span>
								{compareLabel}: {totalCompareValue.toLocaleString()}건
							</span>
						</div>
					) : (
						<span className="text-lg text-gray-600">총 {totalValue.toLocaleString()}건의 데이터</span>
					)}
				</div>
			)}

			{/* 커스텤 레이블 (클릭 가능) */}
			{showLegend && <CustomLegend />}
		</div>
	);
}
