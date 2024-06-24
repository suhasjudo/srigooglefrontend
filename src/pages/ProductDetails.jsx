import React, { useState, useEffect } from 'react';
import Layout from './../components/Layout/Layout';
import axios from 'axios';
import {useParams, useNavigate} from "react-router-dom"

const ProductDetails = () =>{
    const params = useParams();
    const [products, setproducts] = useState({})
    const navigate = useNavigate();

    useEffect(()=>{
        if(params?.slug) getProduct();
    },[params?.slug])

    const getProduct = async() =>{
        try{
            const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
            setproducts(data?.product)
        }catch(error){
            console.log(error);
        }
    }

    return(
        <Layout>
            <div className="row container mt-2">
                <div className="col-md-6">
                    <img className="card-img-top p-3 mt-5" src={products.photo} alt={products.name} style={{width: "60%"}}  />
                </div>
                <div className="col-md-6 ">
                    <h1 className='text-center mt-2'>Mobile Phone Details</h1>
                    {/* <h5>Brand : {products.name}</h54
                    <h5>Description : {products.description}</h5>
                    <h5>Price : {products.price}</h5> */}
                    <div className='d-flex flex-column'>
                        <div className='probox'>
                            <h4 className='promodel pt-3 '><span> Model Name : </span>{products.name}</h4>
                        </div>
                        <div className="prodescription pt-3">
                            <h4>
                                Specification : 
                            </h4>
                            <p>{products.description}</p>
                        </div>
                        <div className="proprice pt-3">
                            <h4>Price : <span> &#8377; {products.price} </span></h4>
                        </div>
                        <button className='btn mt-3' style={{width: '100px', height:'50px'}} onClick={() => navigate('/product-category')}>Go Back</button>
                    </div>                    
                </div>
            </div>
        </Layout>
    )
}


export default ProductDetails;