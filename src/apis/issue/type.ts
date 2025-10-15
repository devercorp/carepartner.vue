export type IssueWriteFormType = {
	issueReportId?: number;
	dailyType: 'daily' | 'weekly' | 'monthly';
	category: string;
	midCategory: string;
	subCategory: string;
	orgCnt: number;
	issueDetail?: string;
	linkUrl?: string;
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
	linkUrl: string;
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
