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
