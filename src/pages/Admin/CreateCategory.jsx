import React,{useState, useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import {Modal} from 'antd';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.withCredentials = true;

const CreateCategory = () =>{
    const [categories,setCategories]= useState([]);
    const [name, setName] = useState("")
    const [visible,setVisible] = useState(false);
    const [selected,setSelected] = useState(null);
    const [updateName, setUpdatedName] = useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post('/api/v1/category/create-category',{name})
            if(data?.success){
                toast.success(`${name} is Created`);
                getAllCategory();
            }
            else{
                toast.error(data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error('Something Wrong in input field');
        }
    }

    const getAllCategory = async() =>{
        try{
            const {data} = await axios.get('/api/v1/category/get-category');
            if(data?.success){
                setCategories(data?.category);
            }
        }
        catch(error){
            console.log(error);
            toast.error('Something went wrong')
        }
    }

    useEffect(()=>{
        getAllCategory();
    },[]);

    const handleUpdate = async(e) => {
        e.preventDefault();
        try{
            const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,
                {name:updateName}
            )
            if(data.success){
                toast.success(data.message)
                setSelected(null);
                setUpdatedName("");
                setVisible(false)
                getAllCategory();
            }
        }
        catch(error){
            toast.error(`${updateName} is updated`);
        }
    }

    const handleDelete = async(pId) =>{
        try{
            const {data} = await axios.delete(`/api/v1/category/delete-category/${pId}`)
            if(data.success){
                toast.success(`Brand deleted Successfully`);
                getAllCategory();
            }
        }
        catch(error){
            toast.error("Something went wrong");
        }
    } 

    return(
        <Layout title={"Dashboard - Add Brand"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"><AdminMenu/></div>
                    <div className="col-md-9">
                        <h1 >Manage Brands</h1>
                        <div className="p-3 w-50">
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-25'>
                            <table className="table w-100">
                                <thead>
                                    <tr>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {categories.map(c => (
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button className='btn btn-primary ms-2' onClick={()=>{setVisible(true); setUpdatedName(c.name); setSelected(c)}} >Edit</button>
                                                    <button className='btn btn-danger ms-2' onClick={()=>{handleDelete(c._id)}} >Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                </tbody>
                            </table>
                        </div>
                        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                            <CategoryForm value={updateName} setValue={setUpdatedName} handleSubmit = {handleUpdate}/>
                        </Modal>
                    </div>
                </div>
            </div>
            
        </Layout>
    )
}

export default CreateCategory;