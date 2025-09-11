import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { API_PATH } from '@/constants/apiPath';
import { AxiosResponseType } from '@/types';

import { api } from '..';
import { FormResponseListParams, FormResponseListResponse, FormTemplateData } from './type';

export const useSaveFormTemplate = () => {
	return useMutation<AxiosResponse<AxiosResponseType>, AxiosError, FormTemplateData>({
		mutationFn: (data) => api.post(API_PATH.FORM, data),
	});
};

export const useGetFormResponseList = (params: FormResponseListParams) => {
	return useQuery<AxiosResponse<FormResponseListResponse>, AxiosError, FormResponseListResponse>({
		queryKey: [API_PATH.DASHBOARD, params],
		queryFn: () => api.post(API_PATH.FORM_RESPONSE_LIST, params),
		select: (data) => data.data,
	});
};
