export const SCORE_OPTIONS = {
	매우만족: 5,
	만족: 4,
	보통: 3,
	불만족: 2,
	매우불만족: 1,
} as const;

export type SCORE_OPTIONS_TYPE = keyof typeof SCORE_OPTIONS;

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
		overallSat: SCORE_OPTIONS_TYPE;
		answerAccuracy: SCORE_OPTIONS_TYPE;
		previousContact: string;
		freeComment: string;
		createdAt: string;
	}[];
	result: 'success' | 'fail';
};
