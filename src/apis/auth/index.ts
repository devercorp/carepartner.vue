import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { API_PATH } from '@/constants/apiPath';

import { api } from '..';
import { LoginForm, LoginResponse } from './type';

export const useLoginApi = () => {
	return useMutation<AxiosResponse<LoginResponse>, AxiosError, LoginForm>({
		mutationFn: (data) => api.post(API_PATH.LOGIN, data),
	});
};

export const useLogoutApi = () => {
	return useMutation<AxiosResponse<void>, AxiosError, { refreshToken: string }>({
		mutationFn: ({ refreshToken }) => api.post(API_PATH.LOGOUT, { refreshToken }),
	});
};
