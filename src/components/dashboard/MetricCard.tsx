import { TrendingUp, TrendingDown } from 'lucide-react';

import { Card, CardContent } from '../ui/card';

interface MetricCardProps {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	color: 'green' | 'orange' | 'purple' | 'blue';
	chartData: number[];
}

export function MetricCard({ title, value, change, trend, color, chartData }: MetricCardProps) {
	const colorClasses = {
		green: 'bg-green-500',
		orange: 'bg-orange-500',
		purple: 'bg-purple-500',
		blue: 'bg-blue-500',
	};

	const bgClasses = {
		green: 'bg-green-50',
		orange: 'bg-orange-50',
		purple: 'bg-purple-50',
		blue: 'bg-blue-50',
	};

	// Simple mini chart using SVG
	const chartWidth = 100;
	const chartHeight = 40;
	const maxValue = Math.max(...chartData);
	const minValue = Math.min(...chartData);
	const range = maxValue - minValue || 1;

	const points = chartData
		.map((value, index) => {
			const x = (index / (chartData.length - 1)) * chartWidth;
			const y = chartHeight - ((value - minValue) / range) * chartHeight;
			return `${x},${y}`;
		})
		.join(' ');

	return (
		<Card className={`${bgClasses[color]} border-0 shadow-sm`}>
			<CardContent className="p-24">
				<div className="flex items-start justify-between">
					<div>
						<p className="text-14 mb-4 text-gray-600">{title}</p>
						<p className="text-20 mb-8 font-semibold">{value}</p>
						<div className="flex items-center gap-4">
							{trend === 'up' ? (
								<TrendingUp className="h-16 w-16 text-green-600" />
							) : (
								<TrendingDown className="h-16 w-16 text-red-600" />
							)}
							<span className={`text-14 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>{change}</span>
						</div>
					</div>

					<div className="flex flex-col items-end">
						<svg width={chartWidth} height={chartHeight} className="mb-8">
							<polyline
								points={points}
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								className={`${colorClasses[color]} text-current`}
							/>
						</svg>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
