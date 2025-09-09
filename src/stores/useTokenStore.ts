import { createStore, useStore } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
	accessToken: string;
	refreshToken: string;
	isLogin: () => boolean;
	setToken: (accessToken: string, refreshToken: string) => void;
	reset: () => void;
};

/**
 * token 전역 Store
 *
 * @description
 * useTokenStore을 import 후 setToken 으로 사용
 *
 */
export const tokenStore = createStore(
	persist<Store>(
		(set, get) => ({
			accessToken: '',
			refreshToken: '',
			isLogin: () => {
				return Boolean(get().accessToken);
			},
			setToken: (accessToken: string, refreshToken: string) => {
				set({
					accessToken,
					refreshToken,
				});
			},
			reset: () => {
				set({
					accessToken: '',
					refreshToken: '',
				});
			},
		}),
		{
			name: 'token_storage',
		}
	)
);

const useTokenStore = () => {
	const store = useStore(tokenStore);
	return store;
};

export default useTokenStore;
