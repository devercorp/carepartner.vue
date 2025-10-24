import { useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { API_PATH } from '@/constants/apiPath';
import { AxiosResponseType } from '@/types';

import { api } from '..';
import { DashboardParams, DashboardResponseType, TagsResponseType } from './type';

export const useGetDashboard = (params: DashboardParams) => {
	return useQuery<AxiosResponse<AxiosResponseType<DashboardResponseType>>, AxiosError, DashboardResponseType>({
		queryKey: [API_PATH.DASHBOARD, params],
		queryFn: () => api.post(API_PATH.DASHBOARD, params),
		select: (data) => data.data.data,
		enabled: !!params.startDate,
	});
};

export const useGetTags = () => {
	return useQuery<
		AxiosResponse<AxiosResponseType<TagsResponseType>>,
		AxiosError,
		{
			tag: string;
			data: string[];
		}[]
	>({
		queryKey: [API_PATH.TAGS],
		queryFn: () => api.get(API_PATH.TAGS),
		select: (data) => {
			const formattedTags = data.data.data.tags.reduce(
				(prev, cur) => {
					if (cur.tags.includes('기_')) {
						prev.기관.push(cur.tags);
					} else if (cur.tags.includes('아카데미_')) {
						prev.아카데미.push(cur.tags);
					} else if (cur.tags.includes('요_')) {
						prev.요양사.push(cur.tags);
					} else {
						prev.일반.push(cur.tags);
					}
					return prev;
				},
				{ 요양사: [] as string[], 기관: [] as string[], 아카데미: [] as string[], 일반: [] as string[] }
			);

			return Object.keys(formattedTags).map((tag) => {
				return {
					tag,
					data: formattedTags[tag as keyof typeof formattedTags],
				};
			});
		},
	});
};
