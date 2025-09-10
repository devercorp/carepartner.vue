import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from './router/Router';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true, // 모바일 환경 background에서 foreground로 올라올때 필요
			retry: false,
			staleTime: 60 * 60 * 1000,
			gcTime: 60 * 60 * 1000,
		},
	},
});

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router />
		</QueryClientProvider>
	);
}
