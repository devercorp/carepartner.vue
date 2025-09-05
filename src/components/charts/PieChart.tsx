import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PieChartProps {
	data: any[];
	dataKey: string;
	nameKey: string;
	title?: string;
	colors?: string[];
	height?: number;
	showLegend?: boolean;
}

export function PieChart({
	data,
	dataKey,
	nameKey,
	title,
	colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#6B7280'],
	height = 300,
	showLegend = true,
}: PieChartProps) {
	return (
		<div>
			{title && <h3 className="mb-16">{title}</h3>}
			<ResponsiveContainer width="100%" height={height}>
				<RechartsPieChart>
					<Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey={dataKey}>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
						))}
					</Pie>
					<Tooltip
						formatter={(value: any, name: any) => [value, name]}
						contentStyle={{
							backgroundColor: '#fff',
							border: '1px solid #e2e8f0',
							borderRadius: '8px',
							boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
						}}
					/>
					{showLegend && <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />}
				</RechartsPieChart>
			</ResponsiveContainer>
		</div>
	);
}
