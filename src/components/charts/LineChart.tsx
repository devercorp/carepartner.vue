import {
	LineChart as RechartsLineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
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
}

export function LineChart({ data, lines, title, height = 300, range }: LineChartProps) {
	return (
		<div>
			{title && <h3 className="mb-16">{title}</h3>}
			<ResponsiveContainer width="100%" height={height}>
				<RechartsLineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
					<XAxis dataKey="period" tick={{ fontSize: 12 }} stroke="#666" />
					<YAxis tick={{ fontSize: 12 }} stroke="#666" domain={range} />
					<Tooltip
						contentStyle={{
							backgroundColor: '#fff',
							border: '1px solid #e2e8f0',
							borderRadius: '8px',
							boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
						}}
					/>
					<Legend />
					{lines.map((line) => (
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
	);
}
