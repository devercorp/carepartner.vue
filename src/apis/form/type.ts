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
	count: number;
	list: {
		surveyId: number;
		phone: string;
		overallSat: string;
		answerAccuracy: string;
		previousContact: string;
		freeComment: string;
		createdAt: string;
	}[];
	result: 'success' | 'fail';
};
