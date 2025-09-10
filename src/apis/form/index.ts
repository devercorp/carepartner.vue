import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { API_PATH } from '@/constants/apiPath';
import { AxiosResponseType } from '@/types';

import { api } from '..';
import { FormTemplateData } from './type';

export const useSaveFormTemplate = () => {
	return useMutation<AxiosResponse<AxiosResponseType>, AxiosError, FormTemplateData>({
		mutationFn: (data) => api.post(API_PATH.FORM, data),
	});
};
