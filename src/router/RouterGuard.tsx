import { Navigate } from 'react-router-dom';

interface RouterGuardProps {
	children: React.ReactNode;
}

const RouterGuard = ({ children }: RouterGuardProps) => {
	// if (1 === 0) {
	// 	return <Navigate to="/login" />;
	// }

	return children;
};

export default RouterGuard;
