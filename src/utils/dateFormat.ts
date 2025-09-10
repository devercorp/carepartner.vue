import { format } from 'date-fns';

/**
 * 주어진 날짜 문자열 또는 Date 객체를 'yyyy-MM-dd' 형식의 문자열로 변환합니다.
 *
 * @param {string | Date} dateString - 변환할 날짜 문자열 또는 Date 객체입니다.
 * @returns {string} 'yyyy-MM-dd' 형식으로 변환된 날짜 문자열을 반환합니다.
 * @throws {Error} 유효하지 않은 날짜 문자열이 입력된 경우 'Invalid date string' 에러를 발생시킵니다.
 */
export function formatDateToYYYYMMDD(dateString?: string | Date): string {
	let date: Date | undefined = undefined;

	if (!dateString) {
		return '-';
	}

	if (typeof dateString !== 'object') {
		date = new Date(dateString);
	} else {
		date = dateString;
	}

	// 날짜가 유효한지 확인
	if (isNaN(date.getTime())) {
		throw new Error('Invalid date string');
	}

	// 날짜를 'yyyy-MM-dd' 형식으로 변환
	return format(date, 'yyyy-MM-dd');
}

/**
 * 주어진 날짜 문자열 또는 Date 객체를 'yyyy-MM-dd HH:mm' 형식의 문자열로 변환합니다.
 *
 * @param {string | Date} dateString - 변환할 날짜 문자열 또는 Date 객체입니다.
 * @returns {string} 'yyyy-MM-dd HH:mm' 형식으로 변환된 날짜 문자열을 반환합니다.
 * @throws {Error} 유효하지 않은 날짜 문자열이 입력된 경우 'Invalid date string' 에러를 발생시킵니다.
 */
export function formatDateToYYYYMMDDHHMM(dateString?: string | Date): string {
	let date: Date | undefined = undefined;

	if (!dateString) {
		return '-';
	}

	if (typeof dateString !== 'object') {
		date = new Date(dateString);
	} else {
		date = dateString;
	}

	// 날짜가 유효한지 확인
	if (isNaN(date.getTime())) {
		throw new Error('Invalid date string');
	}

	// 날짜를 'yyyy-MM-dd HH:mm' 형식으로 변환
	return format(date, 'yyyy-MM-dd HH:mm');
}

/**
 * 주어진 날짜 문자열 또는 Date 객체를 'yy.MM.dd' 형식의 문자열로 변환합니다.
 *
 * @param {string | Date} dateString - 변환할 날짜 문자열 또는 Date 객체입니다.
 * @returns {string} 'yy.MM.dd' 형식으로 변환된 날짜 문자열을 반환합니다.
 * @throws {Error} 유효하지 않은 날짜 문자열이 입력된 경우 'Invalid date string' 에러를 발생시킵니다.
 */
export function formatDateToYYMMDD(dateString?: string | Date): string {
	let date: Date | undefined = undefined;

	if (!dateString) {
		return '-';
	}

	if (typeof dateString !== 'object') {
		date = new Date(dateString);
	} else {
		date = dateString;
	}

	// 날짜가 유효한지 확인
	if (isNaN(date.getTime())) {
		throw new Error('Invalid date string');
	}

	// 날짜를 'yy.MM.dd' 형식으로 변환
	return format(date, 'yy.MM.dd');
}

/**
 * 생년월일 8자리 문자열을 'yy.MM.dd' 형식으로 변환합니다.
 *
 * @param dateString - 변환할 생년월일 8자리 문자열입니다.
 * @returns {string} 'yy.MM.dd' 형식으로 변환된 생년월일 문자열을 반환합니다.
 * @throws {Error} 유효하지 않은 생년월일 문자열이 입력된 경우 '-' 를 반환합니다.
 */
export function formatBirthday(dateString?: string): string {
	if (!dateString || dateString.length !== 8) {
		return '-';
	} else if (dateString.length === 8) {
		return `${dateString.slice(2, 4)}.${dateString.slice(4, 6)}.${dateString.slice(6, 8)}`;
	} else {
		return dateString;
	}
}
