import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Card, CardContent } from '../ui/card';

interface KPICardProps {
	title: string;
	value: string | number;
	subtitle?: string;
	trend?: {
		direction: 'up' | 'down' | 'neutral';
		value: string;
		period?: string;
	};
	icon?: React.ReactNode;
	color?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
	className?: string;
	onClick?: () => void;
}

export function KPICard({ title, value, subtitle, trend, icon, color = 'blue', className, onClick }: KPICardProps) {
	const colorClasses = {
		blue: 'bg-blue-50 text-blue-600 border-blue-200',
		green: 'bg-green-50 text-green-600 border-green-200',
		orange: 'bg-orange-50 text-orange-600 border-orange-200',
		purple: 'bg-purple-50 text-purple-600 border-purple-200',
		red: 'bg-red-50 text-red-600 border-red-200',
	};

	const getTrendIcon = () => {
		if (!trend) return null;

		switch (trend.direction) {
			case 'up':
				return <TrendingUp className="h-20 w-20 text-green-500" />;
			case 'down':
				return <TrendingDown className="h-20 w-20 text-red-500" />;
			case 'neutral':
				return <Minus className="h-20 w-20 text-gray-500" />;
		}
	};

	const getTrendColor = () => {
		if (!trend) return '';

		switch (trend.direction) {
			case 'up':
				return 'text-green-500';
			case 'down':
				return 'text-red-500';
			case 'neutral':
				return 'text-gray-500';
		}
	};

	return (
		<Card className={cn('h-full', className)} onClick={onClick}>
			<CardContent className="p-24">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<p className="text-muted-foreground mb-8 text-3xl font-semibold">{title}</p>
						<p className="mb-4 text-4xl font-bold">{value}</p>
						{subtitle && <p className="text-muted-foreground text-xl">{subtitle}</p>}

						{trend && (
							<div className="mt-8 flex items-center gap-4">
								{getTrendIcon()}
								<span className={`text-xl ${getTrendColor()}`}>{trend.value}</span>
								{trend.period && <span className="text-muted-foreground text-xl">{trend.period}</span>}
							</div>
						)}
					</div>

					{icon && <div className={`rounded-lg p-8 ${colorClasses[color]}`}>{icon}</div>}
				</div>
			</CardContent>
		</Card>
	);
}
