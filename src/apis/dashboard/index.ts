import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { API_PATH } from '@/constants/apiPath';
import { AxiosResponseType } from '@/types';

import { api } from '..';
import { DashboardParams, DashboardResponseType } from './type';

export const useGetDashboard = (params: DashboardParams) => {
	return useQuery<AxiosResponse<AxiosResponseType<DashboardResponseType>>, AxiosError, DashboardResponseType>({
		queryKey: [API_PATH.DASHBOARD, params],
		queryFn: () => api.get(API_PATH.DASHBOARD, params),
		select: (data) => data.data.data,
	});
};
