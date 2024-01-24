import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';

export default function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="header__search">
                <Search />
            </div>
            <div className="header__cart">
                <Cart />
            </div>
            <Navbar />
        </header>
    );
}
