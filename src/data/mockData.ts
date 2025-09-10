// Mock data for the consulting operations dashboard

export const kpiData = {
	daily: {
		totalInquiries: { value: '47건', trend: { direction: 'up' as const, value: '+12%', period: '전일 대비' } },
		caregiverInquiries: { value: '23건', trend: { direction: 'up' as const, value: '+8%', period: '전일 대비' } },
		institutionInquiries: { value: '15건', trend: { direction: 'down' as const, value: '-5%', period: '전일 대비' } },
		academyInquiries: { value: '9건', trend: { direction: 'up' as const, value: '+15%', period: '전일 대비' } },
		chatRatio: { value: '68%(10건)', trend: { direction: 'up' as const, value: '+3%', period: '전일 대비' } },
		phoneRatio: { value: '32%(10건)', trend: { direction: 'down' as const, value: '-3%', period: '전일 대비' } },
		callbackProcessed: { value: '20건', trend: { direction: 'up' as const, value: '+5%', period: '전일 대비' } },
		sameDayResolution: { value: '76%', trend: { direction: 'neutral' as const, value: '0%', period: '전일 대비' } },
		firstResponseTime: { value: '12m', trend: { direction: 'down' as const, value: '-8%', period: '전일 대비' } },
		satisfactionScore: { value: '4.3%', trend: { direction: 'up' as const, value: '+0.2', period: '전일 대비' } },
	},
	weekly: {
		totalInquiries: { value: '334건', trend: { direction: 'up' as const, value: '+18%', period: '전주 대비' } },
		caregiverInquiries: { value: '189건', trend: { direction: 'up' as const, value: '+15%', period: '전주 대비' } },
		institutionInquiries: { value: '98건', trend: { direction: 'up' as const, value: '+22%', period: '전주 대비' } },
		academyInquiries: { value: '47건', trend: { direction: 'up' as const, value: '+25%', period: '전주 대비' } },
		chatRatio: { value: '71%(10건)', trend: { direction: 'up' as const, value: '+4%', period: '전주 대비' } },
		phoneRatio: { value: '29%(10건)', trend: { direction: 'down' as const, value: '-4%', period: '전주 대비' } },
		callbackProcessed: { value: '20건', trend: { direction: 'up' as const, value: '+7%', period: '전주 대비' } },
		sameDayResolution: { value: '81%', trend: { direction: 'up' as const, value: '+3%', period: '전주 대비' } },
		firstResponseTime: { value: '14m', trend: { direction: 'down' as const, value: '-12%', period: '전주 대비' } },
		satisfactionScore: { value: '4.4%', trend: { direction: 'up' as const, value: '+0.3', period: '전주 대비' } },
	},
	monthly: {
		totalInquiries: { value: '1456건', trend: { direction: 'up' as const, value: '+24%', period: '전월 대비' } },
		caregiverInquiries: { value: '823건', trend: { direction: 'up' as const, value: '+28%', period: '전월 대비' } },
		institutionInquiries: { value: '412건', trend: { direction: 'up' as const, value: '+19%', period: '전월 대비' } },
		academyInquiries: { value: '221건', trend: { direction: 'up' as const, value: '+31%', period: '전월 대비' } },
		chatRatio: { value: '73%(10건)', trend: { direction: 'up' as const, value: '+6%', period: '전월 대비' } },
		phoneRatio: { value: '27%(10건)', trend: { direction: 'down' as const, value: '-6%', period: '전월 대비' } },
		callbackProcessed: { value: '20건', trend: { direction: 'up' as const, value: '+9%', period: '전월 대비' } },
		sameDayResolution: { value: '84%', trend: { direction: 'up' as const, value: '+8%', period: '전월 대비' } },
		firstResponseTime: { value: '11m', trend: { direction: 'down' as const, value: '-18%', period: '전월 대비' } },
		satisfactionScore: { value: '4.5%', trend: { direction: 'up' as const, value: '+0.4', period: '전월 대비' } },
	},
};

export const topInquiryTags = {
	weekly: [
		{ tag: 'Care Planning', count: 89, ratio: 26.6, trend: 12, link: '/inquiry/care-planning' },
		{ tag: 'Medication Support', count: 67, ratio: 20.1, trend: 8, link: '/inquiry/medication' },
		{ tag: 'Emergency Response', count: 45, ratio: 13.5, trend: -3, link: '/inquiry/emergency' },
		{ tag: 'Family Coordination', count: 43, ratio: 12.9, trend: 15, link: '/inquiry/family' },
		{ tag: 'Insurance Questions', count: 38, ratio: 11.4, trend: 5, link: '/inquiry/insurance' },
	],
	monthly: [
		{ tag: 'Care Planning', count: 387, ratio: 26.6, trend: 18, link: '/inquiry/care-planning' },
		{ tag: 'Medication Support', count: 293, ratio: 20.1, trend: 12, link: '/inquiry/medication' },
		{ tag: 'Emergency Response', count: 196, ratio: 13.5, trend: -8, link: '/inquiry/emergency' },
		{ tag: 'Family Coordination', count: 188, ratio: 12.9, trend: 22, link: '/inquiry/family' },
		{ tag: 'Insurance Questions', count: 167, ratio: 11.4, trend: 9, link: '/inquiry/insurance' },
	],
};

export const continuouslyIncreasingTags = [
	{ tag: 'Telehealth Setup', trend: 45, months: 3, currentCount: 67 },
	{ tag: 'Digital Care Tools', trend: 38, months: 4, currentCount: 52 },
	{ tag: 'Remote Monitoring', trend: 32, months: 3, currentCount: 43 },
	{ tag: 'Virtual Consultations', trend: 28, months: 5, currentCount: 39 },
	{ tag: 'Health App Support', trend: 24, months: 2, currentCount: 31 },
];

export const dailyIssues = [
	{
		time: '09:30',
		issue: 'ChannelTalk system delayed responses for 15 minutes',
		severity: 'Medium',
		resolved: true,
	},
	{
		time: '14:45',
		issue: 'High volume of emergency calls - staffing adjustment needed',
		severity: 'High',
		resolved: true,
	},
	{
		time: '16:20',
		issue: 'Callback system timeout for institution inquiries',
		severity: 'Low',
		resolved: false,
	},
];

export const satisfactionTrendData = [
	{ period: 'Week 1', score: 2.1 },
	{ period: 'Week 2', score: 4.3 },
	{ period: 'Week 3', score: 3.2 },
	{ period: 'Week 4', score: 5 },
];
