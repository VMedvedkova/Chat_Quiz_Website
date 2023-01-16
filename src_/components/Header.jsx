import { Link, NavLink, Outlet } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light rounded" aria-label="Eleventh navbar example">
            <div className="container-fluid">
            <Link to="/" className="navbar-brand">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
    
            <div className="collapse navbar-collapse" id="navbarsExample09">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink end to="/login" className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink end to="/main_page" className="nav-link">Main page</NavLink>
                </li>
                </ul>
            </div>
            </div>
        </nav>
      <div className="container-lg">
      <Outlet />
      </div>
      </>  
    )
};

export default Header;