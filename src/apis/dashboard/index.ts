import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { API_PATH } from '@/constants/apiPath';
import { AxiosResponseType } from '@/types';

import { api } from '..';
import { DashboardParams } from './type';

export const useGetDashboard = (params: DashboardParams) => {
	return useQuery<AxiosResponse<AxiosResponseType>, AxiosError>({
		queryKey: [API_PATH.DASHBOARD, params],
		queryFn: () => api.get(API_PATH.DASHBOARD, params),
	});
};
