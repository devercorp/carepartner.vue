export type IssueWriteFormType = {
	issueReportId?: number;
	dailyType: 'daily' | 'weekly' | 'monthly';
	category: string;
	midCategory: string;
	subCategory: string;
	orgCnt: number;
	issueDetail?: string;
	links?: string[]; // 폼 관리용 (동적 배열)
	linkUrl1?: string; // API 전송용
	linkUrl2?: string; // API 전송용
	linkUrl3?: string; // API 전송용
	linkUrl4?: string; // API 전송용
	opinion?: string;
};

export type IssueResponseListParams = {
	dailyType: 'daily' | 'weekly' | 'monthly';
	startDate: string;
	category?: '요양사' | '기관' | '아카데미' | '일반';
};

export type IssueResponseListResponse = {
	issuedList: IssueResponseType[];
};

export type IssueResponseType = {
	issueReportId?: number;
	dailyType: 'daily' | 'weekly' | 'monthly';
	category: string;
	midCategory: string;
	subCategory: string;
	orgCnt: number;
	issueDetail: string;
	linkUrl1?: string;
	linkUrl2?: string;
	linkUrl3?: string;
	linkUrl4?: string;
	opinion: string;

	createdAt: string;
};

export type IssueCntParams = {
	dailyType: 'daily' | 'weekly' | 'monthly';
	startDate: string;
	category: string;
	midCategory: string;
	subCategory: string;
};

export type IssueCntResponse = {
	count: number;
	result: 'success' | 'fail';
};
