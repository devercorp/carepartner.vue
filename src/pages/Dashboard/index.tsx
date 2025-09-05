import { Users, MessageCircle, Phone, Clock, CheckCircle, Star } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import { LineChart } from '../../components/charts/LineChart';
import { PieChart } from '../../components/charts/PieChart';
import { DataTable } from '../../components/dashboard/DataTable';
import { KPICard } from '../../components/dashboard/KPICard';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Textarea } from '../../components/ui/textarea';
import {
	kpiData,
	channelData,
	tagDistribution,
	weeklyTrendData,
	monthlyTrendData,
	topInquiryTags,
	dailyIssues,
	satisfactionTrendData,
	dailyTrendData,
} from '../../data/mockData';

const DashboardPage = () => {
	const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');
	const [activeDivision, setActiveDivision] = useState<'total' | 'caregiver' | 'institution' | 'academy'>('total');

	const [notes, setNotes] = useState('');

	const currentKPIs = kpiData[activeTab as keyof typeof kpiData];

	const trendLines = [
		{ dataKey: 'usage', name: '사용법', color: '#3B82F6' },
		{ dataKey: 'inconvenience', name: '불편', color: '#10B981' },
		{ dataKey: 'error', name: '오류', color: '#F59E0B' },
	];

	const currentTrendData =
		activeTab === 'daily' ? dailyTrendData : activeTab === 'monthly' ? monthlyTrendData : weeklyTrendData;
	const currentTopTags =
		activeTab === 'daily' ? topInquiryTags.weekly : topInquiryTags[activeTab as keyof typeof topInquiryTags];

	const topTagsColumns = [
		{ key: 'tag', label: '태그명', type: 'text' },
		{ key: 'count', label: '건수', type: 'number' },
		{ key: 'ratio', label: '비율', type: 'percentage' },
		{ key: 'trend', label: '추이', type: 'trend' },
	];

	const increasingTagsColumns = [
		{ key: 'tag', label: 'Tag', type: 'text' },
		{ key: 'trend', label: 'Growth %', type: 'trend' },
		{ key: 'months', label: 'Months', type: 'number' },
		{ key: 'currentCount', label: 'Current Count', type: 'number' },
	];

	const dailyIssuesColumns = [
		{ key: 'time', label: 'Time', type: 'text' },
		{ key: 'issue', label: 'Issue', type: 'text' },
		{ key: 'severity', label: 'Severity', type: 'text' },
		{ key: 'resolved', label: 'Status', type: 'text' },
	];

	const processedDailyIssues = dailyIssues.map((issue) => ({
		...issue,
		resolved: issue.resolved ? 'Resolved' : 'Pending',
	}));

	return (
		<div className="space-y-24 p-24">
			<div className="flex items-center justify-between">
				<h1 className="text-4xl font-semibold">보살핌 통합 대시보드</h1>
				{/* <div className="text-muted-foreground text-2xl">마지막 업데이트 날짜: {new Date().toLocaleString()}</div> */}
			</div>

			<Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'daily' | 'weekly' | 'monthly')}>
				<TabsList>
					<TabsTrigger value="daily">일간</TabsTrigger>
					<TabsTrigger value="weekly">주간</TabsTrigger>
					<TabsTrigger value="monthly">월간</TabsTrigger>
				</TabsList>

				<TabsContent value={activeTab} className="space-y-24">
					{/* Secondary KPI Cards */}
					<div className="grid grid-cols-1 gap-16 md:grid-cols-4">
						<KPICard
							className={cn('cursor-pointer', activeDivision === 'total' && 'border-blue-300')}
							onClick={() => setActiveDivision('total')}
							title="총 상담 건수"
							value={currentKPIs.totalInquiries.value}
							trend={currentKPIs.totalInquiries.trend}
							icon={<Users className="h-20 w-20" />}
							color="blue"
						/>
						<KPICard
							className={cn('cursor-pointer', activeDivision === 'caregiver' && 'border-blue-300')}
							onClick={() => setActiveDivision('caregiver')}
							title="요양사 상담 건수"
							value={currentKPIs.caregiverInquiries.value}
							trend={currentKPIs.caregiverInquiries.trend}
							color="blue"
						/>
						<KPICard
							className={cn('cursor-pointer', activeDivision === 'institution' && 'border-blue-300')}
							onClick={() => setActiveDivision('institution')}
							title="기관 상담 건수"
							value={currentKPIs.institutionInquiries.value}
							trend={currentKPIs.institutionInquiries.trend}
							color="green"
						/>
						<KPICard
							className={cn('cursor-pointer', activeDivision === 'academy' && 'border-blue-300')}
							onClick={() => setActiveDivision('academy')}
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
							title="콜백 완료 건"
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
								<PieChart data={channelData} dataKey="value" nameKey="name" height={300} />
							</CardContent>
						</Card>
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
							/>
						</CardContent>
					</Card>

					{/* Daily Specific Content */}
					{activeTab === 'daily' && (
						<div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
							<DataTable title="Major Issues Today" data={processedDailyIssues} columns={dailyIssuesColumns} />
							<Card>
								<CardHeader>
									<CardTitle>비고란</CardTitle>
								</CardHeader>
								<CardContent className="space-y-16">
									<Textarea
										placeholder="오늘의 운영 이슈 사항을 작성하세요."
										value={notes}
										onChange={(e) => setNotes(e.target.value)}
										className="min-h-[120px]"
									/>
									<Button className="w-full">Save Notes</Button>
								</CardContent>
							</Card>
						</div>
					)}

					{/* Weekly/Monthly Specific Content */}
					{(activeTab === 'weekly' || activeTab === 'monthly') && (
						<div className="space-y-24">
							<DataTable
								title={`인입이 높은 태그 top 5 (${activeTab === 'weekly' ? '주간' : '월간'})`}
								data={currentTopTags}
								columns={topTagsColumns}
							/>

							{activeTab === 'monthly' && (
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
										<PieChart data={tagDistribution} dataKey="value" nameKey="name" height={300} />
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
