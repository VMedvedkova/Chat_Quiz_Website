// import { Link, NavLink } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { signOut } from '../redux/actions/users'
// import Login from '../components/login'
import Logout from '../logout'
import CustomImage from '../../customComponents/customImage/CustomImage';
import { HeaderContainer } from '../../customComponents/headerContainer';
import logo from '../../assets/images/q.svg';

const Header = ({
    user,
    signOut
}) => {

    return (
        <>
        <HeaderContainer>
            <nav className="navbar navbar-expand-lg" aria-label="Eleventh navbar example">
            <div className="container-fluid">
    
            <div className="" id="navbarsExample09">
                <CustomImage
                    image={logo}
                    width={'55px'}
                    height={'55px'}
                    margin={'0 10px'}
                />
            </div>
                     {user !== null &&
                     <Logout />
                    }
        
            </div>
        </nav>
        </HeaderContainer>
      </>  
    )
};

export default Header;