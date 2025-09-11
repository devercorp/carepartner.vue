/**
 * 그래프 및 차트용 컬러 팔레트
 * 접근성과 시각적 구분성을 고려한 20가지 색상
 */

// 메인 컬러 팔레트 (밝고 선명한 색상)
export const CHART_COLORS_PRIMARY = [
	'#3B82F6', // Blue-500 (파랑)
	'#10B981', // Emerald-500 (에메랄드)
	'#F59E0B', // Amber-500 (호박색)
	'#8B5CF6', // Violet-500 (보라)
	'#EF4444', // Red-500 (빨강)
	'#06B6D4', // Cyan-500 (청록)
	'#84CC16', // Lime-500 (라임)
	'#F97316', // Orange-500 (주황)
	'#EC4899', // Pink-500 (분홍)
	'#6366F1', // Indigo-500 (인디고)
];

// 확장 컬러 팔레트 (더 많은 데이터를 위한 추가 색상)
export const CHART_COLORS_EXTENDED = [
	...CHART_COLORS_PRIMARY,
	'#14B8A6', // Teal-500 (틸)
	'#FBBF24', // Yellow-400 (노랑)
	'#8B5A2B', // Brown-600 (갈색)
	'#6B7280', // Gray-500 (회색)
	'#DC2626', // Red-600 (진한 빨강)
	'#7C3AED', // Violet-600 (진한 보라)
	'#059669', // Emerald-600 (진한 에메랄드)
	'#D97706', // Amber-600 (진한 호박색)
	'#BE123C', // Rose-700 (장미색)
	'#1D4ED8', // Blue-700 (진한 파랑)
];

// 파스텔 컬러 팔레트 (부드러운 느낌)
export const CHART_COLORS_PASTEL = [
	'#93C5FD', // Blue-300
	'#6EE7B7', // Emerald-300
	'#FCD34D', // Amber-300
	'#C4B5FD', // Violet-300
	'#FCA5A5', // Red-300
	'#67E8F9', // Cyan-300
	'#BEF264', // Lime-300
	'#FDBA74', // Orange-300
	'#F9A8D4', // Pink-300
	'#A5B4FC', // Indigo-300
];

// 다크 컬러 팔레트 (진한 색상)
export const CHART_COLORS_DARK = [
	'#1E3A8A', // Blue-800
	'#065F46', // Emerald-800
	'#92400E', // Amber-800
	'#5B21B6', // Violet-800
	'#991B1B', // Red-800
	'#155E75', // Cyan-800
	'#365314', // Lime-800
	'#9A3412', // Orange-800
	'#BE185D', // Pink-800
	'#3730A3', // Indigo-800
];

// 만족도별 컬러 매핑 (FormResponse 페이지용)
export const SATISFACTION_COLORS = {
	매우만족: '#10B981', // Emerald-500 (녹색)
	만족: '#84CC16', // Lime-500 (연두)
	보통: '#F59E0B', // Amber-500 (노랑)
	불만족: '#F97316', // Orange-500 (주황)
	매우불만족: '#EF4444', // Red-500 (빨강)
};

// 상태별 컬러 매핑
export const STATUS_COLORS = {
	success: '#10B981', // Emerald-500
	warning: '#F59E0B', // Amber-500
	error: '#EF4444', // Red-500
	info: '#3B82F6', // Blue-500
	neutral: '#6B7280', // Gray-500
};

// 기본 차트 컬러 (가장 많이 사용)
export const DEFAULT_CHART_COLORS = CHART_COLORS_EXTENDED;

/**
 * 데이터 개수에 따라 적절한 컬러 팔레트를 반환
 * @param count 데이터 개수
 * @returns 적절한 컬러 배열
 */
export const getChartColors = (count: number): string[] => {
	if (count <= 10) {
		return CHART_COLORS_PRIMARY.slice(0, count);
	} else if (count <= 20) {
		return CHART_COLORS_EXTENDED.slice(0, count);
	} else {
		// 20개 이상인 경우 색상을 반복
		const colors = [];
		for (let i = 0; i < count; i++) {
			colors.push(CHART_COLORS_EXTENDED[i % CHART_COLORS_EXTENDED.length]);
		}
		return colors;
	}
};

/**
 * 컬러에 투명도를 적용
 * @param color HEX 컬러 코드
 * @param opacity 투명도 (0-1)
 * @returns RGBA 컬러 문자열
 */
export const addOpacity = (color: string, opacity: number): string => {
	const hex = color.replace('#', '');
	const r = parseInt(hex.substring(0, 2), 16);
	const g = parseInt(hex.substring(2, 4), 16);
	const b = parseInt(hex.substring(4, 6), 16);
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
