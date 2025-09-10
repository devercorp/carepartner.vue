import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import AdminPage from '@/pages/Admin';
import DashboardPage from '@/pages/Dashboard';
import FormResponsePage from '@/pages/FormResponse';
import FormSuccessPage from '@/pages/FormSuccess';
import FormTemplatePage from '@/pages/FormTemplate';
import LoginPage from '@/pages/Login';

import DefaultLayout from '../components/layout/Layout';
import RouterGuard from './RouterGuard';
import UnRouterGuard from './UnRouterGuard';

const router = createBrowserRouter([
	{
		element: (
			<RouterGuard>
				<DefaultLayout />
			</RouterGuard>
		),
		children: [
			{
				path: '/',
				element: <Navigate to="/dashboard" replace />,
			},
			{
				path: '/dashboard',
				element: <DashboardPage />,
			},
			{
				path: '/admin',
				element: <AdminPage />,
			},
			{
				path: '/forms',
				element: <FormResponsePage />,
			},
		],
	},
	{
		path: '/login',
		element: (
			<UnRouterGuard>
				<LoginPage />
			</UnRouterGuard>
		),
	},
	{
		path: '/form-template',
		element: <FormTemplatePage />,
	},
	{
		path: '/form-success',
		element: <FormSuccessPage />,
	},
	{
		path: '*',
		element: <Navigate to="/dashboard" replace />,
	},
]);

const Router = () => {
	return <RouterProvider router={router} />;
};

export default Router;
