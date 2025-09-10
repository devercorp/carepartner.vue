import { Users, MessageCircle, Phone, Clock, CheckCircle, Star } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { LineChart } from '../../components/charts/LineChart';
import { PieChart } from '../../components/charts/PieChart';
import { DataTable } from '../../components/dashboard/DataTable';
import { KPICard } from '../../components/dashboard/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
	kpiData,
	channelData,
	tagDistribution,
	weeklyTrendData,
	monthlyTrendData,
	topInquiryTags,
	satisfactionTrendData,
	dailyTrendData,
} from '../../data/mockData';
import IssueWriteBox from './components/IssueWriteBox';

const DIVISION_TABS = [
	{ label: '전체', value: 'total' },
	{ label: '요양사', value: 'caregiver' },
	{ label: '기관', value: 'institution' },
	{ label: '아카데미', value: 'academy' },
	{ label: '일반', value: 'general' },
] as const;

const trendLines = [
	{ dataKey: 'usage', name: '사용법', color: '#3B82F6' },
	{ dataKey: 'inconvenience', name: '불편', color: '#F59E0B' },
	{ dataKey: 'error', name: '오류', color: '#10B981' },
	{ dataKey: 'etc', name: '기타', color: '#8B5CF6' },
];

const topTagsColumns = [
	{ key: 'tag', label: '태그명', type: 'text' },
	{ key: 'count', label: '건수', type: 'number' },
	{ key: 'ratio', label: '비율', type: 'percentage' },
	{ key: 'trend', label: '추이', type: 'trend' },
];

const DashboardPage = () => {
	const [activeDivision, setActiveDivision] = useState<(typeof DIVISION_TABS)[number]['value']>('total');
	const [activeDateTab, setActiveDateTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

	const currentKPIs = kpiData[activeDateTab as keyof typeof kpiData];

	const currentTrendData =
		activeDateTab === 'daily' ? dailyTrendData : activeDateTab === 'monthly' ? monthlyTrendData : weeklyTrendData;
	const currentTopTags =
		activeDateTab === 'daily' ? topInquiryTags.weekly : topInquiryTags[activeDateTab as keyof typeof topInquiryTags];

	return (
		<div className="space-y-24 p-24 pb-100">
			<div className="flex items-center justify-between">
				<h1 className="text-4xl font-semibold">보살핌 통합 대시보드</h1>
				<div className="text-muted-foreground text-2xl">마지막 업데이트 날짜: {new Date().toLocaleString()}</div>
			</div>

			<Tabs
				value={activeDivision}
				onValueChange={(value) => setActiveDivision(value as (typeof DIVISION_TABS)[number]['value'])}
			>
				<TabsList className="w-full bg-transparent p-0">
					{DIVISION_TABS.map((division) => (
						<TabsTrigger
							key={division.value}
							className={cn(
								'border-0 font-semibold data-[state=active]:text-green-600',
								'border-b-2 border-gray-200 data-[state=active]:border-0 data-[state=active]:border-b-2',
								'data-[state=active]:border-green-600',
								'rounded-none data-[state=active]:bg-transparent',
								'data-[state=active]:shadow-none'
							)}
							value={division.value}
						>
							{division.label}
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>

			<Tabs
				className="gap-24"
				value={activeDateTab}
				onValueChange={(value) => setActiveDateTab(value as 'daily' | 'weekly' | 'monthly')}
			>
				<TabsList>
					<TabsTrigger value="daily">일간</TabsTrigger>
					<TabsTrigger value="weekly">주간</TabsTrigger>
					<TabsTrigger value="monthly">월간</TabsTrigger>
				</TabsList>

				<TabsContent value={activeDateTab} className="space-y-24">
					{/* Secondary KPI Cards */}
					<div className="grid grid-cols-1 gap-16 md:grid-cols-4">
						<KPICard
							title="총 상담 건수"
							value={currentKPIs.totalInquiries.value}
							trend={currentKPIs.totalInquiries.trend}
							icon={<Users className="h-20 w-20" />}
							color="blue"
						/>
						<KPICard
							title="요양사 상담 건수"
							value={currentKPIs.caregiverInquiries.value}
							trend={currentKPIs.caregiverInquiries.trend}
							color="blue"
						/>
						<KPICard
							title="기관 상담 건수"
							value={currentKPIs.institutionInquiries.value}
							trend={currentKPIs.institutionInquiries.trend}
							color="green"
						/>
						<KPICard
							title="아카데미 상담 건수"
							value={currentKPIs.academyInquiries.value}
							trend={currentKPIs.academyInquiries.trend}
							color="orange"
						/>
					</div>

					{/* KPI Cards Section */}
					<div className="grid grid-cols-1 gap-16 md:grid-cols-3 lg:grid-cols-6">
						<KPICard
							title="채팅 상담율"
							value={currentKPIs.chatRatio.value}
							trend={currentKPIs.chatRatio.trend}
							icon={<MessageCircle className="h-20 w-20" />}
							color="green"
						/>
						<KPICard
							title="전화 상담율"
							value={currentKPIs.chatRatio.value}
							trend={currentKPIs.chatRatio.trend}
							icon={<Phone className="h-20 w-20" />}
							color="green"
						/>
						<KPICard
							title="콜백 인입 건"
							value={currentKPIs.callbackProcessed.value}
							trend={currentKPIs.callbackProcessed.trend}
							icon={<Phone className="h-20 w-20" />}
							color="orange"
						/>
						<KPICard
							title="콜백 완료율"
							value={currentKPIs.sameDayResolution.value}
							trend={currentKPIs.sameDayResolution.trend}
							icon={<CheckCircle className="h-20 w-20" />}
							color="purple"
						/>
						<KPICard
							title="당일 처리율"
							value={currentKPIs.satisfactionScore.value}
							trend={currentKPIs.satisfactionScore.trend}
							icon={<Star className="h-20 w-20" />}
							color="green"
						/>

						<KPICard
							title="첫 응대시간"
							value={currentKPIs.firstResponseTime.value}
							trend={currentKPIs.firstResponseTime.trend}
							icon={<Clock className="h-20 w-20" />}
							color="purple"
						/>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>상담 만족도</CardTitle>
						</CardHeader>
						<CardContent>
							<LineChart
								data={satisfactionTrendData}
								lines={[{ dataKey: 'score', name: '상담 만족도', color: '#10B981' }]}
								height={200}
								range={[0, 5]}
							/>
						</CardContent>
					</Card>

					{/* Charts Section */}
					<div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>상담 유형별 건수 추이</CardTitle>
							</CardHeader>
							<CardContent>
								<LineChart data={currentTrendData} lines={trendLines} height={300} />
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>전체 상담 유형 분포</CardTitle>
							</CardHeader>
							<CardContent>
								<PieChart data={channelData} dataKey="value" height={300} />
							</CardContent>
						</Card>
					</div>

					<IssueWriteBox />

					{/* Weekly/Monthly Specific Content */}
					{(activeDateTab === 'weekly' || activeDateTab === 'monthly') && (
						<div className="space-y-24">
							<DataTable
								title={`인입이 높은 태그 top 5 (${activeDateTab === 'weekly' ? '주간' : '월간'})`}
								data={currentTopTags}
								columns={topTagsColumns}
							/>

							{activeDateTab === 'monthly' && (
								// <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
								// 	<DataTable
								// 		title="인입이 높은 태그 top 5"
								// 		data={continuouslyIncreasingTags}
								// 		columns={increasingTagsColumns}
								// 	/>

								<Card>
									<CardHeader>
										<CardTitle>지속적으로 증가하는 태그 top 5</CardTitle>
									</CardHeader>
									<CardContent>
										<PieChart data={tagDistribution} dataKey="value" height={300} />
									</CardContent>
								</Card>
								// 		</div>
							)}
						</div>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default DashboardPage;
