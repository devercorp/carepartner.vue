import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// mem - 토큰 재발급 위함

import { tokenStore } from '@/stores/useTokenStore';
import { AxiosResponseType } from '@/types';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	// headers: {
	// 	Accept: import.meta.env.VITE_ACCEPT,
	// },
});

axiosInstance.interceptors.request.use(
	(request: InternalAxiosRequestConfig) => {
		// const tokenStore = useTokenStore();
		const accessToken = tokenStore.getState().accessToken;

		request.headers['Authorization'] = `${accessToken}`;

		return request;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	}
);
// response 받은 후 작업
// axiosInstance.interceptors.response.use(
// 	// 2xx 범위인 경우
// 	async (response: AxiosResponse) => {
// 		const { config, data } = response;

// 		console.log(`${config.url} \n`, data); // 데이터 콘솔로 찍기
// 		// const error = response?.data?.error;

// 		return response;
// 	}, // 2xx 범위 외의 상태코드
// 	async (error: AxiosError) => {
// 		const config = error.config as InternalAxiosRequestConfig;
// 		const response = error.response as AxiosResponse;

// 		// console.error(`${config.url} \n`, error); // 에러 콘솔로 찍기

// 		// 401, 403 에러 시 토큰 재발급
// 		if (response.status === 401 || response.status === 403) {
// 			// requestToken 요청인 경우 로그아웃
// 			if (config.url === API_PATH.AUTH.RENEWAL_TOKEN) {
// 				alert('로그인이 만료되었습니다. 다시 로그인해주세요');
// 				tokenStore.getState().reset();
// 				location.href = '/login';
// 			} else {
// 				// 새 토큰이 정상적으로 발급되면 중단된 요청을 재요청
// 				if (await requestToken()) {
// 					return axiosInstance(config);
// 				}
// 			}
// 		} else if (error.code === 'ERR_NETWORK') {
// 			alert('네트워크 에러. 잠시 후 시도해주세요 ');
// 		} else if (error.code === 'ERR_BAD_RESPONSE') {
// 			alert('서버가 응답하지 않습니다. 서비스 관리자에게 문의해주세요');
// 		} else if (error.code === 'ECONNABORTED') {
// 			alert('요청시간을 초과했습니다. 잠시 후 시도해주세요');
// 		} else if (error.code === 'ERR_BAD_REQUEST') {
// 			alert('올바르지 않은 요청입니다. 서비스 관리자에게 문의해주세요');
// 		} else {
// 			alert(error.code ?? '알 수 없는 에러가 발생했습니다. 서비스 관리자에게 문의해주세요');
// 		}
// 		return Promise.reject(error);
// 	}
// );

// 토큰 재발급
// const requestToken = memoize(
// 	async (): Promise<boolean> => {
// 		try {
// 			const res = await axiosInstance.post(API_PATH.AUTH.RENEWAL_TOKEN);
// 			if (res.data.success) {
// 				return true;
// 			} else {
// 				throw new Error('Success was false');
// 			}
// 		} catch (e: any) {
// 			console.error('requestToken error', e);
// 			return false;
// 		}
// 	},
// 	{ maxAge: 1000 }
// );

export const api = {
	get: <T>(url: string, params?: any, config?: any) =>
		axiosInstance.get<AxiosResponseType<T>>(url, { params, ...config }),
	post: <T>(url: string, data?: any, config?: any) => axiosInstance.post<AxiosResponseType<T>>(url, data, config),
	put: <T>(url: string, data?: any, config?: any) => axiosInstance.put<AxiosResponseType<T>>(url, data, config),
	patch: <T>(url: string, data?: any, config?: any) => axiosInstance.patch<AxiosResponseType<T>>(url, data, config),
	delete: <T>(url: string, params?: any, config?: any) =>
		axiosInstance.delete<AxiosResponseType<T>>(url, { params, ...config }),
};
