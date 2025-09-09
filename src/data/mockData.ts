// Mock data for the consulting operations dashboard

export const kpiData = {
	daily: {
		totalInquiries: { value: '47건', trend: { direction: 'up' as const, value: '+12%', period: '전일 대비' } },
		caregiverInquiries: { value: '23건', trend: { direction: 'up' as const, value: '+8%', period: '전일 대비' } },
		institutionInquiries: { value: '15건', trend: { direction: 'down' as const, value: '-5%', period: '전일 대비' } },
		academyInquiries: { value: '9건', trend: { direction: 'up' as const, value: '+15%', period: '전일 대비' } },
		chatRatio: { value: '68%', trend: { direction: 'up' as const, value: '+3%', period: '전일 대비' } },
		phoneRatio: { value: '32%', trend: { direction: 'down' as const, value: '-3%', period: '전일 대비' } },
		callbackProcessed: { value: '89%', trend: { direction: 'up' as const, value: '+5%', period: '전일 대비' } },
		sameDayResolution: { value: '76%', trend: { direction: 'neutral' as const, value: '0%', period: '전일 대비' } },
		firstResponseTime: { value: '12m', trend: { direction: 'down' as const, value: '-8%', period: '전일 대비' } },
		satisfactionScore: { value: '4.3%', trend: { direction: 'up' as const, value: '+0.2', period: '전일 대비' } },
	},
	weekly: {
		totalInquiries: { value: '334건', trend: { direction: 'up' as const, value: '+18%', period: '전주 대비' } },
		caregiverInquiries: { value: '189건', trend: { direction: 'up' as const, value: '+15%', period: '전주 대비' } },
		institutionInquiries: { value: '98건', trend: { direction: 'up' as const, value: '+22%', period: '전주 대비' } },
		academyInquiries: { value: '47건', trend: { direction: 'up' as const, value: '+25%', period: '전주 대비' } },
		chatRatio: { value: '71%', trend: { direction: 'up' as const, value: '+4%', period: '전주 대비' } },
		phoneRatio: { value: '29%', trend: { direction: 'down' as const, value: '-4%', period: '전주 대비' } },
		callbackProcessed: { value: '92%', trend: { direction: 'up' as const, value: '+7%', period: '전주 대비' } },
		sameDayResolution: { value: '81%', trend: { direction: 'up' as const, value: '+3%', period: '전주 대비' } },
		firstResponseTime: { value: '14m', trend: { direction: 'down' as const, value: '-12%', period: '전주 대비' } },
		satisfactionScore: { value: '4.4%', trend: { direction: 'up' as const, value: '+0.3', period: '전주 대비' } },
	},
	monthly: {
		totalInquiries: { value: '1456건', trend: { direction: 'up' as const, value: '+24%', period: '전월 대비' } },
		caregiverInquiries: { value: '823건', trend: { direction: 'up' as const, value: '+28%', period: '전월 대비' } },
		institutionInquiries: { value: '412건', trend: { direction: 'up' as const, value: '+19%', period: '전월 대비' } },
		academyInquiries: { value: '221건', trend: { direction: 'up' as const, value: '+31%', period: '전월 대비' } },
		chatRatio: { value: '73%', trend: { direction: 'up' as const, value: '+6%', period: '전월 대비' } },
		phoneRatio: { value: '27%', trend: { direction: 'down' as const, value: '-6%', period: '전월 대비' } },
		callbackProcessed: { value: '94%', trend: { direction: 'up' as const, value: '+9%', period: '전월 대비' } },
		sameDayResolution: { value: '84%', trend: { direction: 'up' as const, value: '+8%', period: '전월 대비' } },
		firstResponseTime: { value: '11m', trend: { direction: 'down' as const, value: '-18%', period: '전월 대비' } },
		satisfactionScore: { value: '4.5%', trend: { direction: 'up' as const, value: '+0.4', period: '전월 대비' } },
	},
};

export const channelData = [
	{ name: '사용법', value: 73, color: '#3B82F6' },
	{ name: '오류문의', value: 37, color: '#10B981' },
	{ name: '불편신고', value: 1, color: '#F59E0B' },
	{ name: '기타', value: 49, color: '#0f172a' },
];

export const tagDistribution = [
	{ name: 'caregiver', value: 56, color: '#3B82F6' },
	{ name: 'institution', value: 28, color: '#10B981' },
	{ name: 'academy', value: 16, color: '#F59E0B' },
];

export const dailyTrendData = [
	{ period: '오늘', usage: 45, inconvenience: 23, error: 12, etc: 10 },
	{ period: '어제', usage: 52, inconvenience: 28, error: 15, etc: 12 },
	{ period: '2일전', usage: 48, inconvenience: 25, error: 13, etc: 11 },
	{ period: '3일전', usage: 56, inconvenience: 32, error: 18, etc: 13 },
];

export const weeklyTrendData = [
	{ period: '1주차', usage: 45, inconvenience: 23, error: 12, etc: 10 },
	{ period: '2주차', usage: 52, inconvenience: 28, error: 15, etc: 12 },
	{ period: '3주차', usage: 48, inconvenience: 25, error: 13, etc: 11 },
	{ period: '4주차', usage: 56, inconvenience: 32, error: 18, etc: 13 },
	{ period: '5주차', usage: 56, inconvenience: 32, error: 18, etc: 13 },
];

export const monthlyTrendData = [
	{ period: 'Jan', usage: 178, inconvenience: 89, error: 45, etc: 10 },
	{ period: 'Feb', usage: 195, inconvenience: 92, error: 52, etc: 12 },
	{ period: 'Mar', usage: 212, inconvenience: 98, error: 58, etc: 11 },
	{ period: 'Apr', usage: 189, inconvenience: 95, error: 61, etc: 13 },
	{ period: 'May', usage: 234, inconvenience: 112, error: 67, etc: 13 },
	{ period: 'Jun', usage: 267, inconvenience: 128, error: 74, etc: 13 },
];

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
	{ period: 'Week 1', score: 4.1 },
	{ period: 'Week 2', score: 4.3 },
	{ period: 'Week 3', score: 4.2 },
	{ period: 'Week 4', score: 4.4 },
];
