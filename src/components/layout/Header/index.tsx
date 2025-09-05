import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header>
			<h1>Dever Vite + React + TS</h1>
			<ul>
				<Link to={'/'}>Home</Link>
				<Link to={'/about'}>About</Link>
			</ul>
		</header>
	);
};

export default Header;
