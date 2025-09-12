import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { API_PATH } from '@/constants/apiPath';
import { AxiosResponseType } from '@/types';

import { api } from '..';
import {
	IssueCntParams,
	IssueCntResponse,
	IssueResponseListParams,
	IssueResponseListResponse,
	IssueWriteFormType,
} from './type';

export const useSaveIssue = () => {
	const queryClient = useQueryClient();
	return useMutation<AxiosResponse<AxiosResponseType>, AxiosError, IssueWriteFormType[]>({
		mutationFn: (data) => api.post(API_PATH.ISSUE_WRITE, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [API_PATH.ISSUE_LIST] });
		},
	});
};

export const useDeleteIssue = () => {
	return useMutation<AxiosResponse<AxiosResponseType>, AxiosError, { issue_report_id: number }>({
		mutationFn: (data) => api.post(API_PATH.ISSUE_DELETE, data),
	});
};

export const useGetIssueResponseList = (params: IssueResponseListParams) => {
	return useQuery<AxiosResponse<{ data: IssueResponseListResponse }>, AxiosError, IssueResponseListResponse>({
		queryKey: [API_PATH.ISSUE_LIST, params],
		queryFn: () => api.get(API_PATH.ISSUE_LIST, params),
		select: (data) => data.data.data,
		enabled: !!params.startDate,
	});
};

export const fetchGetIssueCnt = async (params: IssueCntParams) => {
	return api.get<AxiosResponse<IssueCntResponse>>(API_PATH.ISSUE_CNT, params);
};
