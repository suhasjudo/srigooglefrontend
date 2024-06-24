import React,{useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Select} from 'antd';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const {Option} = Select 

const CreateProduct = () =>{
    const [categories, setCategories] = useState([]);
    const [category,setCategory] = useState("");
    const [name,setName] = useState("");
    const [photo,setPhoto] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const navigate = useNavigate();

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

    const handleFileUpload = (event) =>{
        const selectedFile = event.target.files[0]
        if(selectedFile){
            const storageRef = firebase.storage().ref()
            const fileRef = storageRef.child(selectedFile.name)

            fileRef.put(selectedFile)
             .then((snapshot)=>{
                snapshot.ref.getDownloadURL()
                .then((downloadURL)=>{
                    setPhoto(downloadURL)
                })
             })
             
        }
        else{
            console.log("No file selected")
        }
    }

    const handleCreate = async(e) =>{
        e.preventDefault();
        try{
            const productData = new FormData();
            productData.append("name",name)
            productData.append("description",description)
            productData.append("price",price)
            productData.append("photo",photo);
            productData.append("quantity",quantity);
            productData.append("category",category);
            const {data} = await axios.post('/api/v1/product/create-product', productData )
            if(data?.success){
                toast.success(data?.message)
                navigate('/dashboard/admin/products')
            }else{
                toast.error('Something Went Wrong')
            }
        }
        catch(error){
            console.log(error);
            toast.error('something went wrong');
        }
    }

    return(
        <Layout title={"Dashboard - Add Mobile"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"><AdminMenu/></div>
                    <div className="col-md-9">
                        <h2>Add Mobile Phone</h2>
                        <div className='m-1 w-75'>
                            <Select variant={false} 
                            placeholder="Select a Brand" 
                            size="large"
                            showSearch 
                            className='form-select mb-3' 
                            onChange={(value)=>{setCategory(value)}}>
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    Upload Photo
                                    <input type="file" name="photo" id="photo" onChange={handleFileUpload} hidden/>
                                </label>
                            </div>
                            <div className="mb-3"> 
                                {photo && (
                                    <div className="text-center">
                                        <img src={photo} alt="product photo" height={'200px'} className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text" value={name} placeholder="Enter Model name" className='form-control' onChange={(e)=>setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                {/* <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label> */}
                                <textarea className="form-control" value={description} placeholder="Enter Mobile Description"  rows="5"  onChange={(e)=>setDescription(e.target.value)}></textarea>
                            </div>
                            <div className="mb-3">
                                <input type="Number" value={price} placeholder="Enter Price" className='form-control' onChange={(e)=>setPrice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="number" value={quantity} placeholder="Enter Stock " className='form-control' onChange={(e)=>setQuantity(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreate}>Add Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  
        </Layout>
    )
}

export default CreateProduct;