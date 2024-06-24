import React,{useState,useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom'

const Products = () => {
    const[products, setProduct] =useState([])

    const getAllProducts = async()=>{
        try{
            const {data} = await axios.get('/api/v1/product/get-product');
            setProduct(data.products);
            // console.log(data.products.photo);
        }
        catch(error){
            console.log(error);
            toast.error("Something Went Wrong");
        }
    }

    useEffect(() =>{
        getAllProducts();
    },[])

    return (
        <Layout>
            <div className="row m-3 ">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9">
                    <div className="text-center">
                        <h2>All Mobiles List</h2>
                        <div className="d-flex flex-wrap" >
                                {products?.map((p)=>(
                                <>
                                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                                    <div className="card m-2" style={{width: "18rem"}} >
                                        <img className="card-img-top p-3" src={p.photo} alt={p.name} style={{width: "15rem", height:"18rem"}} />
                                        <div className="card-body">
                                            <h5 className="card-title">{p.name}</h5>
                                            <p className="card-text">{p.price}</p>
                                        </div>
                                    </div>
                                </Link>
                                </>
                            ))}
                            </div>
                        
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Products;
