import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface DataTableProps {
	title: string;
	data: any[];
	columns: {
		key: string;
		label: string;
		type?: 'text' | 'number' | 'trend' | 'percentage' | string;
	}[];
}

export function DataTable({ title, data, columns }: DataTableProps) {
	const renderCell = (item: any, column: any) => {
		const value = item[column.key];

		switch (column.type) {
			case 'trend': {
				const trendIcon =
					value > 0 ? (
						<TrendingUp className="h-16 w-16 text-green-500" />
					) : value < 0 ? (
						<TrendingDown className="h-16 w-16 text-red-500" />
					) : (
						<Minus className="h-16 w-16 text-gray-500" />
					);

				const trendColor = value > 0 ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-600';

				return (
					<div className="flex items-center gap-4">
						{trendIcon}
						<span className={trendColor}>
							{value > 0 ? '+' : ''}
							{value}%
						</span>
					</div>
				);
			}
			case 'percentage':
				return `${value}%`;
			case 'number':
				return typeof value === 'number' ? value.toLocaleString() : value;
			default:
				return value;
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map((column) => (
								<TableHead key={column.key}>{column.label}</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((item, index) => (
							<TableRow key={index}>
								{columns.map((column) => (
									<TableCell key={column.key}>{renderCell(item, column)}</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
