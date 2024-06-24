import React,{useState, useEffect} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import {Select} from "antd";
import {useNavigate, useParams} from 'react-router-dom';
import AdminMenu from '../../components/Layout/AdminMenu';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [category,setCategory] = useState("");
    const [name,setName] = useState("");
    const [photo,setPhoto] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [quantity,setQuantity] = useState("");
    const [id,setId] = useState("");
    const navigate = useNavigate();
    const params = useParams();

    const getSingleProduct = async()=>{
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setName(data.product.name);
            setDescription(data.product.description);
            setPhoto(data.product.photo)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setCategory(data.product.category._id)
            setId(data.product._id);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getSingleProduct();
    },[])

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


    const handleDelete = async() =>{
        try{
            const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`);
            toast.success("Deleted Successfully");
            navigate('/dashboard/admin/products')

        }
        catch(error){
            console.log(error);
            toast.error("Deletion Error");
        }
    }

    const handleUpdate = async(e) =>{
        e.preventDefault();
        try{
            const productData = new FormData();
            productData.append("name",name)
            productData.append("description",description)
            productData.append("price",price)
            productData.append("photo",photo);
            productData.append("quantity",quantity);
            productData.append("category",category);
            const {data} = await axios.put(`/api/v1/product/update-product/${id}`, productData )
            if(data?.success){
                toast.success('Product Updated Successfully')
                navigate('/dashboard/admin/products')
            }else{
                toast.error(data?.message)
            }
        }
        catch(error){
            console.log(error);
            toast.error('something went wrong');
        }
    }
    return (
        <Layout title={"Dashboard - update Mobile"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3"><AdminMenu/></div>
                    <div className="col-md-9">
                        <h2>Update Mobile Phone</h2>
                        <div className='m-1 w-75'>
                            <Select variant={false} 
                            placeholder="Select a Brand" 
                            size="large"
                            showSearch 
                            className='form-select mb-3' 
                            value={category}
                            onChange={(value)=>{setCategory(value)}}>
                                {categories?.map(c => (
                                    <Select.Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Select.Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    Upload Photo
                                    <input type="file" name="photo"  id="photo" onChange={handleFileUpload} hidden/>
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

                            <div className="mb-3 ">
                                <button className="btn btn-primary m-1" onClick={handleUpdate}>Update Product</button>
                                <button className="btn btn-danger m-1" onClick={handleDelete}>Delete Product</button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
  
        </Layout>
    );
}

export default UpdateProduct;
