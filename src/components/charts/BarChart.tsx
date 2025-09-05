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
}

export function BarChart({
	data,
	dataKey,
	nameKey,
	title,
	colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444'],
	height = 300,
}: BarChartProps) {
	return (
		<div>
			{title && <h3 className="mb-16">{title}</h3>}
			<ResponsiveContainer width="100%" height={height}>
				<RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
					<XAxis dataKey={nameKey} tick={{ fontSize: 12 }} stroke="#666" />
					<YAxis tick={{ fontSize: 12 }} stroke="#666" />
					<Tooltip
						contentStyle={{
							backgroundColor: '#fff',
							border: '1px solid #e2e8f0',
							borderRadius: '8px',
							boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
						}}
					/>
					<Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
						))}
					</Bar>
				</RechartsBarChart>
			</ResponsiveContainer>
		</div>
	);
}
