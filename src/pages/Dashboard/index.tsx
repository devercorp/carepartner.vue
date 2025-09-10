import { Users, MessageCircle, Phone, Clock, CheckCircle, Star } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useGetDashboard } from '@/apis/dashboard';
import { DashboardParams } from '@/apis/dashboard/type';
import DatePicker from '@/components/common/DatePicker';
import MonthPicker from '@/components/common/DatePicker/MonthPicker';
import WeekPicker from '@/components/common/DatePicker/WeekPicker';
import { cn } from '@/lib/utils';

import { LineChart } from '../../components/charts/LineChart';
import { PieChart } from '../../components/charts/PieChart';
import { DataTable } from '../../components/dashboard/DataTable';
import { KPICard } from '../../components/dashboard/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { topInquiryTags } from '../../data/mockData';
import IssueWriteBox from './components/IssueWriteBox';
import { calculateRatio, calculateTrend, valueUnitFormat } from './utils/dataFormat';

const DIVISION_TABS = [
	{ label: '전체', value: '' },
	{ label: '요양사', value: 'caregiver' },
	{ label: '기관', value: 'institution' },
	{ label: '아카데미', value: 'academy' },
	{ label: '일반', value: 'general' },
] as const;

const trendLines = [
	{ dataKey: 'inconvenience', name: '불편', color: '#F59E0B' },
	{ dataKey: 'howToUse', name: '사용법', color: '#3B82F6' },
	{ dataKey: 'error', name: '오류', color: '#10B981' },
	{ dataKey: 'etc', name: '기타', color: '#8B5CF6' },
];

const topTagsColumns = [
	{ key: 'no', label: '번호', type: 'number' },
	{ key: 'subCategory', label: '태그명', type: 'text' },
	{ key: 'cnt', label: '건수', type: 'number' },
	{ key: 'trendPct', label: '추이', type: 'trend' },
];

const DashboardPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [activeDivision, setActiveDivision] = useState<string>(String(searchParams.get('categoryType') ?? ''));
	const [activeDateTab, setActiveDateTab] = useState<string>(searchParams.get('dailyType') ?? 'daily');

	const [selectedDate, setSelectedDate] = useState<string>(
		searchParams.get('startDate') ?? new Date().toISOString().split('T')[0]
	);

	const { data: dashboardData, isLoading } = useGetDashboard({
		categoryType: activeDivision as DashboardParams['categoryType'],
		dailyType: activeDateTab as DashboardParams['dailyType'],
		startDate: selectedDate,
	});

	const kpiPeriod = useMemo(
		() => (activeDateTab === 'daily' ? '전일대비' : activeDateTab === 'weekly' ? '전주대비' : '전월대비'),
		[activeDateTab]
	);
	const surveyPeriod = useCallback(
		(dayIndex: number) => {
			if (activeDateTab === 'daily') {
				return dayIndex === 0 ? '오늘' : dayIndex === 1 ? '어제' : `${dayIndex}일전`;
			} else if (activeDateTab === 'weekly') {
				return dayIndex === 0 ? '이번주' : dayIndex === 1 ? '지난주' : `${dayIndex}주전`;
			} else {
				return dayIndex === 0 ? '이번달' : dayIndex === 1 ? '지난달' : `${dayIndex}달전`;
			}
		},
		[activeDateTab]
	);

	const handleDateChange = (date: string) => {
		setSelectedDate(date);
		setSearchParams({ startDate: date, dailyType: activeDateTab, categoryType: activeDivision });
	};

	const formatTotalTags = () => {
		const channelData = dashboardData?.consultation.reduce(
			(acc, curr) => {
				acc[0] = { ...acc[0], value: acc[0].value + (curr.howToUse ?? 0) };
				acc[1] = { ...acc[1], value: acc[1].value + (curr.error ?? 0) };
				acc[2] = { ...acc[2], value: acc[2].value + (curr.inconvenience ?? 0) };
				acc[3] = { ...acc[3], value: acc[3].value + (curr.etc ?? 0) };
				return acc;
			},
			[
				{ name: '사용법', value: 0, color: '#3B82F6' },
				{ name: '오류문의', value: 0, color: '#10B981' },
				{ name: '불편신고', value: 0, color: '#F59E0B' },
				{ name: '기타', value: 0, color: '#0f172a' },
			]
		);

		return channelData ?? [];
	};

	return (
		<div className="space-y-24 p-24 pb-100">
			<div className="flex items-center justify-between">
				<h1 className="text-4xl font-semibold">보살핌 통합 대시보드</h1>
				<div className="text-muted-foreground text-2xl">마지막 업데이트 날짜: {new Date().toLocaleString()}</div>
			</div>

			<Tabs
				value={activeDivision}
				onValueChange={(value) => {
					setActiveDivision(value as (typeof DIVISION_TABS)[number]['value']);
					setActiveDateTab('daily');
					setSearchParams({ categoryType: value });
				}}
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
				onValueChange={(value) => {
					setActiveDateTab(value as DashboardParams['dailyType']);
					setSearchParams({ dailyType: value, startDate: selectedDate });
				}}
			>
				<div className="flex items-center gap-16">
					<TabsList>
						<TabsTrigger value="daily">일간</TabsTrigger>
						<TabsTrigger value="weekly">주간</TabsTrigger>
						<TabsTrigger value="monthly">월간</TabsTrigger>
					</TabsList>

					{activeDateTab === 'daily' && <DatePicker onChange={handleDateChange} value={selectedDate} />}
					{activeDateTab === 'weekly' && <WeekPicker onChange={handleDateChange} value={selectedDate} />}
					{activeDateTab === 'monthly' && <MonthPicker onChange={handleDateChange} value={selectedDate} />}
				</div>

				<TabsContent value={activeDateTab} className="space-y-24">
					{/* Secondary KPI Cards */}
					<div className="grid grid-cols-1 gap-16 md:grid-cols-4">
						<KPICard
							title="총 상담 건수"
							value={valueUnitFormat(dashboardData?.dashTop.totalCount || 0, '건')}
							trend={{
								...calculateTrend(dashboardData?.dashTop.totalCount || 0, dashboardData?.dashTop.lastTotalCount || 0),
								period: kpiPeriod,
							}}
							icon={<Users className="h-20 w-20" />}
							color="blue"
						/>
						<KPICard
							title="요양사 상담 건수"
							value={valueUnitFormat(dashboardData?.dashTop.caregiverCount || 0, '건')}
							trend={{
								...calculateTrend(
									dashboardData?.dashTop.caregiverCount || 0,
									dashboardData?.dashTop.lastCaregiverCount || 0
								),
								period: kpiPeriod,
							}}
							color="blue"
						/>
						<KPICard
							title="기관 상담 건수"
							value={valueUnitFormat(dashboardData?.dashTop.orgCount || 0, '건')}
							trend={{
								...calculateTrend(dashboardData?.dashTop.orgCount || 0, dashboardData?.dashTop.lastOrgCount || 0),
								period: kpiPeriod,
							}}
							color="green"
						/>
						<KPICard
							title="아카데미 상담 건수"
							value={valueUnitFormat(dashboardData?.dashTop.academyCount || 0, '건')}
							trend={{
								...calculateTrend(
									dashboardData?.dashTop.academyCount || 0,
									dashboardData?.dashTop.lastAcademyCount || 0
								),
								period: kpiPeriod,
							}}
							color="orange"
						/>
					</div>

					{/* KPI Cards Section */}
					<div className="grid grid-cols-1 gap-16 md:grid-cols-3 lg:grid-cols-6">
						<KPICard
							title="채팅 상담율"
							value={valueUnitFormat(
								calculateRatio(dashboardData?.dashTop.chatRate ?? 0, dashboardData?.dashTop.totalCount ?? 0),
								'%'
							)}
							trend={{
								...calculateTrend(
									calculateRatio(dashboardData?.dashTop.chatRate ?? 0, dashboardData?.dashTop.totalCount ?? 0),
									calculateRatio(dashboardData?.dashTop.lastChatRate ?? 0, dashboardData?.dashTop.lastTotalCount ?? 0),
									'ratio'
								),
								period: kpiPeriod,
							}}
							icon={<MessageCircle className="h-20 w-20" />}
							color="green"
						/>
						<KPICard
							title="전화 상담율"
							value={valueUnitFormat(
								calculateRatio(dashboardData?.dashTop.callRate ?? 0, dashboardData?.dashTop.totalCount ?? 0),
								'%'
							)}
							trend={{
								...calculateTrend(
									calculateRatio(dashboardData?.dashTop.callRate ?? 0, dashboardData?.dashTop.totalCount ?? 0),
									calculateRatio(dashboardData?.dashTop.lastCallRate ?? 0, dashboardData?.dashTop.lastTotalCount ?? 0),
									'ratio'
								),
								period: kpiPeriod,
							}}
							icon={<Phone className="h-20 w-20" />}
							color="green"
						/>
						<KPICard
							title="콜백 인입 건"
							value={valueUnitFormat(dashboardData?.dashTop.callBack || 0, '건')}
							trend={{
								...calculateTrend(dashboardData?.dashTop.callBack || 0, dashboardData?.dashTop.lastCallBack || 0),
								period: kpiPeriod,
							}}
							icon={<Phone className="h-20 w-20" />}
							color="orange"
						/>
						<KPICard
							title="콜백 완료율"
							value={valueUnitFormat(dashboardData?.dashTop.callBackSuc || 0, '건')}
							trend={{
								...calculateTrend(dashboardData?.dashTop.callBackSuc || 0, dashboardData?.dashTop.lastCallBackSuc || 0),
								period: kpiPeriod,
							}}
							icon={<CheckCircle className="h-20 w-20" />}
							color="purple"
						/>
						<KPICard
							title="당일 처리율"
							value={valueUnitFormat(0 || 0, '%')}
							trend={{
								...calculateTrend(0, 0),
								period: kpiPeriod,
							}}
							icon={<Star className="h-20 w-20" />}
							color="green"
						/>

						<KPICard
							title="첫 응대시간"
							value={valueUnitFormat(0 || 0, '분')}
							trend={{
								...calculateTrend(0, 0),
								period: kpiPeriod,
							}}
							icon={<Clock className="h-20 w-20" />}
							color="purple"
						/>
					</div>
					{!isLoading && (
						<>
							<Card>
								<CardHeader>
									<CardTitle>상담 만족도</CardTitle>
								</CardHeader>
								<CardContent>
									<LineChart
										data={
											dashboardData?.surveyOverallAvg.reverse().map((item) => ({
												...item,
												period: surveyPeriod(item.dayIndex),
											})) ?? []
										}
										lines={[{ dataKey: 'avgOverallSat', name: '상담 만족도', color: '#10B981' }]}
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
										<LineChart
											data={
												dashboardData?.consultation.reverse().map((item) => ({
													...item,
													period: item.dayIndex === 0 ? '오늘' : item.dayIndex === 1 ? '어제' : `${item.dayIndex}일전`,
												})) ?? []
											}
											lines={trendLines}
											height={300}
										/>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>전체 상담 유형 분포</CardTitle>
									</CardHeader>
									<CardContent>
										<PieChart data={formatTotalTags()} dataKey="value" height={300} showDataTable />
									</CardContent>
								</Card>
							</div>
						</>
					)}

					<IssueWriteBox />

					{/* Weekly/Monthly Specific Content */}
					{(activeDateTab === 'weekly' || activeDateTab === 'monthly') && (
						<div className="space-y-24">
							<DataTable
								title={`인입이 높은 태그 top 5 (${activeDateTab === 'weekly' ? '주간' : '월간'})`}
								data={dashboardData?.topTags.map((item, index) => ({ ...item, no: index + 1 })) ?? []}
								columns={topTagsColumns}
							/>

							{/* {activeDateTab === 'monthly' && (
								<Card>
									<CardHeader>
										<CardTitle>지속적으로 증가하는 태그 top 5</CardTitle>
									</CardHeader>
									<CardContent>
										<PieChart data={tagDistribution} dataKey="value" height={300} />
									</CardContent>
								</Card>
							)} */}
						</div>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default DashboardPage;
