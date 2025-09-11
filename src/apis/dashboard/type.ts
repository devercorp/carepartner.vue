export const CategoryType = {
	ACADEMY: 'academy',
	ORG: 'org',
	CAREGIVER: 'caregiver',
	NORMAL: 'normal',
} as const;

export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType];

export type DashboardParams = {
	categoryType: CategoryType | string;
	dailyType: 'daily' | 'weekly' | 'monthly';
	startDate: string;
};

export type DashboardResponseType = {
	dashTop: {
		/** 총 상담 건수 */
		totalCount: number;
		lastTotalCount: number;

		caregiverCount: number;
		lastCaregiverCount: number;

		/** 기관 상담 건수 */
		orgCount: number;
		lastOrgCount: number;

		/** 아카데미 상담 건수 */
		academyCount: number;
		lastAcademyCount: number;

		/** 일반 상담 건수 */
		normalCount: number;
		lastNormalCount: number;

		/** 채팅상담율  */
		chatRate: number;
		lastCallRate: number;

		/** 전화상담율  */
		callRate: number;
		lastChatRate: number;

		/** 콜백 건수 */
		callBack: number;
		lastCallBack: number;

		/** 콜백 완료건수 */
		callBackSuc: number;
		lastCallBackSuc: number;

		outBound: number;
		lastOutBound: number;
	};

	consultation: {
		dayIndex: number;
		totalCount: number;
		inconvenience?: number; // 불편
		howToUse?: number; // 사용법
		error?: number; // 오류
		etc?: number; // 기타
	}[];

	surveyOverallAvg: {
		avgOverallSat: number;
		dayIndex: number;
	}[];

	incMonthTop: {
		cnt: number;
		subCategory: string;
	}[];

	topTags: {
		subCategory: string;
		cnt: number;
		trendPct?: number;
	}[];

	catMidSubNested: {
		category: string;
		mids: {
			midCategory: '요양사' | '기관' | '아카데미' | '일반';
			subs: {
				cnt: number;
				subCategory: string;
			}[];
		}[];
	}[];
};
