import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { API_PATH } from '@/constants/apiPath';
import { AxiosResponseType } from '@/types';

import { api } from '..';
import { LoginForm } from './type';

export const useLoginApi = () => {
	return useMutation<AxiosResponse<AxiosResponseType>, AxiosError, LoginForm>({
		mutationFn: (data) => api.post(API_PATH.LOGIN, data),
	});
};
