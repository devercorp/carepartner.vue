export const CategoryType = {
	ACADEMY: 'academy',
	ORG: 'org ',
	CAREGIVER: 'caregiver ',
	NORMAL: 'normal',
} as const;

export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType];

export type DashboardParams = {
	categoryType: CategoryType | string;
};
