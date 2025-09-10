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
export const calculateTrend = (current: number, previous: number): TrendResult => {
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
