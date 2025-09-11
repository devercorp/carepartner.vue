import { useState } from 'react';
import {
	LineChart as RechartsLineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
	data: any[];
	lines: {
		dataKey: string;
		name: string;
		color: string;
	}[];
	title?: string;
	height?: number;
	range?: [number, number];
	showLegend?: boolean;
}

export function LineChart({ data, lines, title, height = 300, range, showLegend = true }: LineChartProps) {
	// 각 라인의 표시/숨김 상태를 관리
	const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>(
		lines.reduce(
			(acc, line) => {
				acc[line.dataKey] = true;
				return acc;
			},
			{} as Record<string, boolean>
		)
	);

	// 표시될 라인 필터링
	const visibleLinesData = lines.filter((line) => visibleLines[line.dataKey]);

	// 레이블 클릭 핸들러
	const handleLabelClick = (dataKey: string) => {
		setVisibleLines((prev) => ({
			...prev,
			[dataKey]: !prev[dataKey],
		}));
	};

	// 커스텀 레이블 컴포넌트
	const CustomLegend = () => (
		<div className="mt-16 flex flex-wrap justify-center gap-12">
			{lines.map((line) => (
				<div
					key={line.dataKey}
					className={`flex cursor-pointer items-center gap-8 transition-opacity duration-200 select-none ${
						visibleLines[line.dataKey] ? 'opacity-100' : 'opacity-50'
					}`}
					onClick={() => handleLabelClick(line.dataKey)}
				>
					<div
						className="h-12 w-12 rounded-sm"
						style={{
							backgroundColor: visibleLines[line.dataKey] ? line.color : '#d1d5db',
						}}
					/>
					<span className="text-xl font-medium">{line.name}</span>
				</div>
			))}
		</div>
	);

	return (
		<div className="space-y-16">
			{title && <h3 className="mb-24 text-center text-2xl font-semibold">{title}</h3>}

			{/* 차트 영역 */}
			<div>
				<ResponsiveContainer width="100%" height={height}>
					<RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
						<XAxis dataKey="period" tick={{ fontSize: 12 }} stroke="#666" />
						<YAxis tick={{ fontSize: 12 }} stroke="#666" domain={range} />
						<Tooltip
							formatter={(value: any, name: any) => [value, name]}
							contentStyle={{
								backgroundColor: '#fff',
								border: '1px solid #e2e8f0',
								borderRadius: '8px',
								boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
								fontSize: '14px',
							}}
						/>
						{visibleLinesData.map((line) => (
							<Line
								key={line.dataKey}
								type="monotone"
								dataKey={line.dataKey}
								stroke={line.color}
								strokeWidth={2}
								dot={{ r: 4 }}
								name={line.name}
							/>
						))}
					</RechartsLineChart>
				</ResponsiveContainer>
			</div>

			{/* 커스텀 레이블 (클릭 가능) */}
			{showLegend && <CustomLegend />}
		</div>
	);
}
