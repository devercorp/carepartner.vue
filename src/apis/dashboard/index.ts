import { useQuery } from '@tanstack/react-query';

import { API_PATH } from '@/constants/apiPath';

import { api } from '..';

export const useGetDashboard = (params: { categoryType: string }) => {
	return useQuery({
		queryKey: [API_PATH.DASHBOARD, params],
		queryFn: () => api.get(API_PATH.DASHBOARD, params),
	});
};
