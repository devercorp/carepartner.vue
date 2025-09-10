import { Navigate } from 'react-router-dom';

import useTokenStore from '@/stores/useTokenStore';

interface UnRouterGuardProps {
	children: React.ReactNode;
}

const UnRouterGuard = ({ children }: UnRouterGuardProps) => {
	const tokenStore = useTokenStore();

	if (tokenStore.isLogin()) {
		return <Navigate to="/" />;
	}

	return children;
};

export default UnRouterGuard;
