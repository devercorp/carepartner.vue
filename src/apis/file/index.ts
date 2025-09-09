import { API_PATH } from '@/constants/apiPath';

import { api } from '..';

export const uploadFile = async (formData: FormData) => {
	return api.post(API_PATH.EXCEL_UPLOAD, formData);
};
