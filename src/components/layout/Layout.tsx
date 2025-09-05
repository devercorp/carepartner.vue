import { Outlet } from 'react-router-dom';

import { Sidebar } from './Sidebar';

const Layout = () => {
	return (
		<>
			{/* <Header /> */}

			<div className="flex h-screen flex-col bg-gray-50">
				{/* <TopNavigation onLogout={handleLogout} /> */}
				<div className="flex flex-1">
					<Sidebar />
					<main className="flex-1 overflow-auto md:ml-64">{<Outlet />}</main>
				</div>
			</div>
		</>
	);
};

export default Layout;
