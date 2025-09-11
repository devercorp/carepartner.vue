/**
 * Axios 응답 타입
 */
export interface AxiosResponseType<T = any> {
	data: T;
	// extras: { rs_message: string; rs_code: RsCodeType };
	result: 'success' | 'fail';
}
