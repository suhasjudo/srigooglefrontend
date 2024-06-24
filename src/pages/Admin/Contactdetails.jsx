import React,{useState,useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom'


const Contactdetails = () =>{

    const [cont, setCont] = useState([]);


    const handleDelete = async(pId) =>{
        try{
            const {data} = await axios.delete(`/api/v1/contact/delete-contact/${pId}`);
            if(data.success){
                toast.success(`Contact deleted Successfully`);
                getAllContacts();
            }
        }
        catch(error){
            toast.error("Something went wrong");
        }
    } 

    const getAllContacts = async() =>{
        try{
            const {data} = await axios.get('/api/v1/contact/get-Contact');
            setCont(data.contacts);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getAllContacts();
    },[])

    return(
        <Layout>
            <div className='row m-3'>
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <div className="text-center">
                        <h2>Contact Details</h2>
                        <div className="d-flex flex-column">
                               <table className="table-bordered">
                                <thead className="thead-dark">
                                    <tr>
                                    {/* <th scope="col">Sno</th> */}
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Questions</th>
                                    <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cont?.map((p)=>(
                                        <tr key={p._id} >
                                            <td className='p-3'>{p.firstname}</td>
                                            <td className='p-3'>{p.lastname}</td>
                                            <td className='p-3'>{p.email}</td>
                                            <td className='p-3'>{p.phone}</td>
                                            <td className='p-3'>{p.qns}</td>
                                            <td className='p-3'><button className='btn btn-danger' onClick={()=>{handleDelete(p._id)}}>Delete</button></td>
                                        </tr>
                                        ))}
                                </tbody>
                             </table>
                             
                            
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contactdetails;