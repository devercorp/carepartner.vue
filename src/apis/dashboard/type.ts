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
	excludeTags?: string[];
	topN?: number;
	level: 'mid' | 'sub';
};

export type DashboardResponseType = {
	lastUpload: string;
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
		totalCount: number;
		dayIndex: number;
		inconvenience?: number; // 불편
		howToUse?: number; // 사용법
		error?: number; // 오류
		etc?: number; // 기타

		/** 전체 일 경우 */
		academyCount?: number; // 아카데미 상담 건수
		caregiverCount?: number; // 요양사 상담 건수
		normalCount?: number; // 일반 상담 건수
		orgCount?: number; // 기관 상담 건수

		/** 아케데미일경우 */
		inquiry?: number;
		acEtc?: number;
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

		category: string;
		level: 'mid' | 'sub';
		midCategory: string;
		name: string;
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

	catMidSubNested2: {
		category: string;
		mids: {
			midCategory: '요양사' | '기관' | '아카데미' | '일반';
			subs: {
				cnt: number;
				subCategory: string;
			}[];
		}[];
	}[];

	dailyRate: {
		curr_ratio_pct: number;
		diff_pct: number;
		prev_ratio_pct: number;
	}[];

	watingTime: { watingTime: string; watingTimeSeconds: number; ymd: string }[];

	surveyPointCnt: {
		answer: { answerFive: number; answerFour: number; answerOne: number; answerThree: number; answerTwo: number };
		overall: { overallFive: number; overallFour: number; overallOne: number; overallThree: number; overallTwo: number };
	};
};

export type TagsResponseType = {
	tags: {
		tags: string;
	}[];
};
