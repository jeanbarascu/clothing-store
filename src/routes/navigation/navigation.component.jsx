import { Outlet, Link } from 'react-router-dom';

import './navigation.styles.scss';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => {
  return (
    <>
      <nav className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;
