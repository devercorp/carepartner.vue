// Mock data for the new dashboard design

export const metricsData = [
	{
		title: '총 매출',
		value: '₩45,230,000',
		change: '+8.5%',
		trend: 'up' as const,
		color: 'green' as const,
		chartData: [20, 25, 22, 30, 28, 35, 32],
	},
	{
		title: '총 주문',
		value: '1,254',
		change: '+12.3%',
		trend: 'up' as const,
		color: 'orange' as const,
		chartData: [100, 120, 110, 135, 140, 160, 155],
	},
	{
		title: '고객 수',
		value: '8,963',
		change: '+5.7%',
		trend: 'up' as const,
		color: 'purple' as const,
		chartData: [800, 850, 820, 890, 920, 950, 940],
	},
	{
		title: '내 잔액',
		value: '₩12,450,000',
		change: '-2.1%',
		trend: 'down' as const,
		color: 'blue' as const,
		chartData: [1300, 1250, 1280, 1200, 1220, 1180, 1150],
	},
];

export const revenueData = [
	{ month: '1월', revenue: 4200, orders: 890 },
	{ month: '2월', revenue: 3800, orders: 756 },
	{ month: '3월', revenue: 5200, orders: 1123 },
	{ month: '4월', revenue: 4800, orders: 1045 },
	{ month: '5월', revenue: 5800, orders: 1256 },
	{ month: '6월', revenue: 6200, orders: 1345 },
];

export const promotionalSalesData = [
	{ name: '온라인', value: 45, color: '#3B82F6' },
	{ name: '매장', value: 30, color: '#10B981' },
	{ name: '모바일', value: 25, color: '#F59E0B' },
];

export const topSalesData = [
	{
		id: 1,
		image: '/api/placeholder/40/40',
		title: '프리미엄 상담 서비스',
		price: '₩89,000',
		sales: 145,
	},
	{
		id: 2,
		image: '/api/placeholder/40/40',
		title: '기본 케어 플랜',
		price: '₩45,000',
		sales: 98,
	},
	{
		id: 3,
		image: '/api/placeholder/40/40',
		title: '응급 지원 서비스',
		price: '₩120,000',
		sales: 76,
	},
	{
		id: 4,
		image: '/api/placeholder/40/40',
		title: '교육 프로그램',
		price: '₩65,000',
		sales: 54,
	},
	{
		id: 5,
		image: '/api/placeholder/40/40',
		title: '월간 구독 서비스',
		price: '₩29,000',
		sales: 43,
	},
];

export const visitorData = {
	total: 15678,
	change: '+3.2%',
	trend: 'up' as const,
};
