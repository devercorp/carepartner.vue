export type FormTemplateData = {
	phone: string;
	overallSat: number;
	answerAccuracy: number;
	previousContact: 'YES' | 'NO' | 'NOT_SURE' | '';
	freeComment?: string;
};

export type FormResponseListParams = {
	page: number;
	size: number;
	startDate: string;
	endDate: string;
};

export type FormResponseListResponse = {
	totalCount: number;
	page: number;
	size: number;
	items: {
		surveyId: number;
		phone: string;
		overallSatText: string;
		answerAccuracyText: string;
		previousContactText: string;
		freeComment: string;
		createdAt: string;
	}[];
};
