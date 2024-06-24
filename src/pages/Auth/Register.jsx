import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../../stylesheets/AuthStyles.css'

// Set the base URL for axios
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register', { name, email, password, answer });
            if (res && res.data.success) {
                toast.success(res.data.message);
                // console.log(res.data.message)
                navigate('/login');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error.response ? error.response.data : error.message);
            toast.error(error.response ? error.response.data.message : "Something went wrong");
        }
    };

    return (
        <Layout title='Register'>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Register Form</h4>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} id="name" name="name" placeholder='Enter Name' required autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="email" name="email" placeholder='Enter Email' required autoComplete="off" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} name="password" placeholder='Enter Password' required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="answer" className="form-label">Answer</label>
                        <input type="text" className="form-control" id="answer" onChange={(e) => setAnswer(e.target.value)} name="answer" placeholder='Enter Favourite Sports' required />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;
