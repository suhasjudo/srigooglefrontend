import React, {useState} from 'react';
import Layout from '../../components/Layout/Layout';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../../stylesheets/AuthStyles.css';
import { useAuth } from '../../context/Auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login', {email, password });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
            toast.error(error.response ? error.response.data.message : "Something went wrong");
        }
    };
    return (
        <div>
            <Layout title='Register'>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Login</h4>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder='Enter Email' required autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} name="password" placeholder='Enter Password' required />
                    </div>
                    <div className='mb-2'>
                        {/* <button type="button" className="btn btn-primary " onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button> */}
                        <Link to='/forgot-password' style={{padding:'2px'}}>Forgot Password</Link>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </Layout>
        </div>
    );
}

export default Login;
