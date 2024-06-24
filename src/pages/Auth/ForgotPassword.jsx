import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../stylesheets/AuthStyles.css";
import Layout from '../../components/Layout/Layout';


const ForgotPassword =()=>{
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password', {email, answer, newPassword });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
            toast.error(error.response ? error.response.data.message : "Something went wrong");
        }
    };
    return(
        <Layout title={'forgot password'}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Reset Password</h4>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder='Enter Email' required autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="answer" className="form-label">Answer</label>
                        <input type="text" className="form-control" onChange={(e) => setAnswer(e.target.value)} id="answer" name="email" placeholder='Enter Favourite Sport' required autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="newPassword" onChange={(e) => setNewPassword(e.target.value)} name="newPassword" placeholder='Enter Password' required />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgotPassword;