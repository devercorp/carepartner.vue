import { TrendingUp } from 'lucide-react';

import { BarChart } from '../components/charts/BarChart';
import { PieChart } from '../components/charts/PieChart';
import { MetricCard } from '../components/dashboard/MetricCard';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { metricsData, revenueData, promotionalSalesData, topSalesData, visitorData } from '../data/dashboardData';

export function NewDashboard() {
	return (
		<div className="space-y-24 p-24">
			{/* Metrics Cards */}
			<div className="grid grid-cols-1 gap-24 md:grid-cols-2 lg:grid-cols-4">
				{metricsData.map((metric, index) => (
					<MetricCard key={index} {...metric} />
				))}
			</div>

			{/* Charts Section */}
			<div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
				{/* Revenue Chart */}
				<Card>
					<CardHeader>
						<CardTitle>매출 현황</CardTitle>
					</CardHeader>
					<CardContent>
						<BarChart
							data={revenueData}
							dataKey="revenue"
							nameKey="month"
							height={300}
							colors={['#3B82F6', '#10B981']}
						/>
					</CardContent>
				</Card>

				{/* Promotional Sales Chart */}
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>프로모션 매출</CardTitle>
							<div className="text-right">
								<div className="flex items-center gap-4">
									<TrendingUp className="h-16 w-16 text-green-500" />
									<span className="text-14 text-green-600">{visitorData.change}</span>
								</div>
								<p className="text-20 font-semibold">{visitorData.total.toLocaleString()}</p>
								<p className="text-14 text-gray-500">총 방문자 수</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<PieChart
							data={promotionalSalesData}
							dataKey="value"
							height={250}
							colors={['#3B82F6', '#10B981', '#F59E0B']}
						/>
					</CardContent>
				</Card>
			</div>

			{/* Top Sales List */}
			<Card>
				<CardHeader>
					<CardTitle>베스트 상품</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-16">
						{topSalesData.map((item, index) => (
							<div key={item.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-16">
								<div className="flex items-center gap-16">
									<div className="flex items-center gap-8">
										<span className="text-14 font-medium text-gray-500">#{index + 1}</span>
										<Avatar className="h-40 w-40">
											<AvatarImage src={item.image} />
											<AvatarFallback>상품</AvatarFallback>
										</Avatar>
									</div>
									<div>
										<h4 className="font-medium">{item.title}</h4>
										<p className="text-14 text-gray-500">{item.price}</p>
									</div>
								</div>

								<div className="text-right">
									<Badge variant="secondary" className="mb-4">
										{item.sales}건 판매
									</Badge>
									<p className="text-14 text-gray-500">판매량</p>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
