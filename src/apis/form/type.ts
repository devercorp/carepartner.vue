export type FormTemplateData = {
	phone: string;
	overallSat: number;
	answerAccuracy: number;
	previousContact: 'YES' | 'NO' | 'NOT_SURE' | '';
	freeComment?: string;
};
