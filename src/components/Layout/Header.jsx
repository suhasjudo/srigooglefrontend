import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import logo from '../../assets/originallogo.png';
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogout = () =>{
        setAuth({
            ...auth,user: null,token:""
        })
        localStorage.removeItem('auth');
        toast.success("Logout Successfully");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <button className="navbar-toggler" style={{color:'white'}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon " style={{color: 'white'}}></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <img className="logo" style={{width:'50px', height: '50px'}} src={logo} alt="pic"/>
                    <Link to="/" className="navbar-brand" href="#">Sri Google Paradise</Link>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <SearchInput/>
                        <li className="nav-item">
                        <NavLink to="/" className="nav-link"  >Home</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/about" className="nav-link" >About Us</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to="/product-category" className="nav-link" >Product Catalogue</NavLink>
                        </li>
                        {
                            !auth.user ? (<><li className="nav-item">
                            {/* <NavLink to="/register" className="nav-link" href="/register">Register</NavLink> */}
                            </li>
                            <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                            </li></>):(<>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                                    {auth?.user?.name}
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li>
                                    <NavLink to='/dashboard/admin' className='dropdown-item'>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/login' onClick={handleLogout} className='dropdown-item'>
                                            Logout
                                        </NavLink>
                                    </li>
                                </ul>
                            </li>
                            
                            </>)
                        }
                        <li className="nav-item">
                        <NavLink to="/contact" className="nav-link" >Contact</NavLink>
                        </li>
                        
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Header;
