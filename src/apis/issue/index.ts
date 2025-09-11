import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { API_PATH } from '@/constants/apiPath';
import { AxiosResponseType } from '@/types';

import { api } from '..';
import { IssueResponseListParams, IssueResponseListResponse, IssueWriteFormType } from './type';

export const useSaveIssue = () => {
	return useMutation<AxiosResponse<AxiosResponseType>, AxiosError, IssueWriteFormType[]>({
		mutationFn: (data) => api.post(API_PATH.ISSUE_WRITE, data),
	});
};

export const useGetIssueResponseList = (params: IssueResponseListParams) => {
	return useQuery<AxiosResponse<{ data: IssueResponseListResponse }>, AxiosError, IssueResponseListResponse>({
		queryKey: [API_PATH.ISSUE_LIST, params],
		queryFn: () => api.get(API_PATH.ISSUE_LIST, params),
		select: (data) => data.data.data,
	});
};
