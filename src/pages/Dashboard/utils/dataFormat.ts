export const valueUnitFormat = (value: string | number, unit: string) => {
	return `${value.toString()}${unit}`;
};

/**
 * 변화율 결과 타입
 */
export interface TrendResult {
	/** 변화 방향 ('up' | 'down' | 'neutral') */
	direction: 'up' | 'down' | 'neutral';
	/** 포맷된 변화율 문자열 (예: "+12.5%", "-5.3%", "0.0%") */
	value: string;
}

/**
 * 시간 차이 결과 타입
 */
export interface TimeDifferenceResult {
	/** 변화 방향 ('up' | 'down' | 'neutral') - 시간이 단축되면 down(개선), 증가하면 up(악화) */
	direction: 'up' | 'down' | 'neutral' | 'up_reverse' | 'down_reverse';
	/** 포맷된 시간 차이 문자열 (예: "1시간 30분", "0시간 0분") */
	value: string;
	/** 현재 시간 포맷된 문자열 */
	current: string;
	/** 분 단위 차이 (양수: 증가, 음수: 감소) */
	differenceInMinutes: number;
}

/**
 * HH:MM:SS 형식의 시간을 분으로 변환합니다.
 *
 * @param timeString - "HH:MM:SS" 형식의 시간 문자열
 * @returns 분으로 변환된 숫자
 *
 * @example
 * timeToMinutes("01:30:00") // 90
 * timeToMinutes("00:45:30") // 45.5
 */
export const timeToMinutes = (timeString: string): number => {
	const [hours, minutes, seconds] = timeString.split(':').map(Number);
	return hours * 60 + minutes + (seconds || 0) / 60;
};

/**
 * 분을 시간과 분으로 변환합니다.
 *
 * @param totalMinutes - 총 분 수
 * @returns {hours, minutes} 객체
 *
 * @example
 * minutesToHoursAndMinutes(90) // { hours: 1, minutes: 30 }
 * minutesToHoursAndMinutes(45) // { hours: 0, minutes: 45 }
 */
export const minutesToHoursAndMinutes = (totalMinutes: number): { hours: number; minutes: number } => {
	const absMinutes = Math.abs(totalMinutes);
	const hours = Math.floor(absMinutes / 60);
	const minutes = Math.round(absMinutes % 60);

	return { hours, minutes };
};

/**
 * 두 시간을 비교하여 차이를 계산합니다.
 *
 * @param currentTime - 현재 시간 ("HH:MM:SS" 형식)
 * @param previousTime - 이전 시간 ("HH:MM:SS" 형식)
 * @returns TimeDifferenceResult 객체
 *
 * @example
 * calculateTimeDifference("01:30:00", "01:00:00")
 * // { direction: 'up', value: "0시간 30분", current: "1시간 30분", differenceInMinutes: 30 }
 *
 * calculateTimeDifference("01:00:00", "01:30:00")
 * // { direction: 'down', value: "0시간 30분", current: "1시간 0분", differenceInMinutes: -30 }
 */
export const calculateTimeDifference = (currentTime: string, previousTime: string): TimeDifferenceResult => {
	const currentMinutes = timeToMinutes(currentTime);
	const previousMinutes = timeToMinutes(previousTime);
	const differenceInMinutes = currentMinutes - previousMinutes;

	// 현재 시간 포맷
	const currentHM = minutesToHoursAndMinutes(currentMinutes);
	const current = `${currentHM.hours}시간 ${currentHM.minutes}분`;

	// 차이 시간 포맷
	const diffHM = minutesToHoursAndMinutes(Math.abs(differenceInMinutes));
	const value = `${diffHM.hours}시간 ${diffHM.minutes}분`;

	// direction 결정 (시간이 줄어들면 down(개선), 늘어나면 up(악화))
	let direction: 'up' | 'down' | 'neutral' | 'up_reverse' | 'down_reverse';
	if (differenceInMinutes > 0) {
		direction = 'up_reverse'; // 시간 증가 (악화)
	} else if (differenceInMinutes < 0) {
		direction = 'down_reverse'; // 시간 단축 (개선)
	} else {
		direction = 'neutral'; // 변화 없음
	}

	return {
		direction,
		value,
		current,
		differenceInMinutes,
	};
};

/**
 * 이전 값과 현재 값을 비교하여 변화율을 계산합니다.
 *
 * @param current - 현재 값
 * @param previous - 이전 값
 * @returns TrendResult 객체 (퍼센티지, 방향, 포맷된 문자열, 변화량)
 *
 * @example
 * calculateTrend(120, 100) // { percentage: 20.0, direction: 'up', formatted: '+20.0%', change: 20 }
 * calculateTrend(80, 100)  // { percentage: -20.0, direction: 'down', formatted: '-20.0%', change: -20 }
 * calculateTrend(100, 100) // { percentage: 0.0, direction: 'same', formatted: '0.0%', change: 0 }
 */
export const calculateTrend = (current: number, previous: number, type: 'ratio' | 'number' = 'number'): TrendResult => {
	// 이전 값이 0인 경우 처리
	if (previous === 0) {
		if (current === 0) {
			return {
				direction: 'neutral',
				value: '0.0%',
			};
		}
		// 이전 값이 0이고 현재 값이 있으면 무한대 증가로 간주
		return {
			direction: 'up',
			value: '+100.0%',
		};
	}

	const change = current - previous;
	const percentage = (change / previous) * 100;

	if (type === 'ratio') {
		return {
			direction: current > previous ? 'up' : current < previous ? 'down' : 'neutral',
			value: `${change.toFixed(1)}%`,
		};
	}

	let direction: 'up' | 'down' | 'neutral';
	if (percentage > 0) {
		direction = 'up';
	} else if (percentage < 0) {
		direction = 'down';
	} else {
		direction = 'neutral';
	}

	const roundedPercentage = Math.round(percentage * 10) / 10; // 소수점 1자리

	let formatted: string;
	if (roundedPercentage > 0) {
		formatted = `+${roundedPercentage.toFixed(1)}%`;
	} else if (roundedPercentage < 0) {
		formatted = `${roundedPercentage.toFixed(1)}%`;
	} else {
		formatted = '0.0%';
	}

	return {
		direction,
		value: formatted,
	};
};

/**
 * 간단한 변화율 표시용 함수
 *
 * @param current - 현재 값
 * @param previous - 이전 값
 * @returns 포맷된 변화율 문자열
 *
 * @example
 * formatTrendSimple(120, 100) // "+20.0%"
 * formatTrendSimple(80, 100)  // "-20.0%"
 */
export const formatTrendSimple = (current: number, previous: number): string => {
	return calculateTrend(current, previous).value;
};

/**
 * 비율 계산 결과 타입
 */
export interface RatioResult {
	/** 비율 퍼센티지 (소수점 1자리) */
	percentage: number;
	/** 포맷된 비율 문자열 (예: "25.0%", "0.0%") */
	formatted: string;
	/** 실제 값 */
	value: number;
	/** 전체 값 */
	total: number;
}

/**
 * 전체 데이터에서 특정 데이터의 비율을 계산합니다.
 *
 * @param value - 특정 값
 * @param total - 전체 값
 * @param decimalPlaces - 소수점 자리수 (기본값: 1)
 * @returns RatioResult 객체 (퍼센티지, 포맷된 문자열, 값, 전체)
 *
 * @example
 * calculateRatio(25, 100) // { percentage: 25.0, formatted: "25.0%", value: 25, total: 100 }
 * calculateRatio(33, 100) // { percentage: 33.0, formatted: "33.0%", value: 33, total: 100 }
 * calculateRatio(0, 100)  // { percentage: 0.0, formatted: "0.0%", value: 0, total: 100 }
 */
export const calculateRatio = (value: number, total: number, decimalPlaces: number = 1): number => {
	// 전체 값이 0인 경우 처리
	if (total === 0) {
		return 0;
	}

	// 비율 계산
	const percentage = (value / total) * 100;
	const roundedPercentage = Math.round(percentage * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

	return roundedPercentage;
};
