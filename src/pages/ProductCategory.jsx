import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import {Checkbox, Radio} from 'antd';
import Prices from '../components/Prices';
import {useNavigate} from 'react-router-dom';

const ProductCategory = () => {
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    

    const getAllCategory = async () =>{
        try{
            const {data} = await axios.get("/api/v1/category/get-category");
            if(data?.success){
                setCategories(data?.category);
            }
        }
        catch(error){
            consolr.log(error);
            // toast.error("Something went wrong in getting category");
        }
    }

    const getAllProducts = async() =>{
        try{  
            const {data} = await axios.get('/api/v1/product/get-product');
            setProducts(data.products);

        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(!checked.length || !radio.length)getAllProducts();
    },[])

    useEffect(()=>{
        if(checked.length || radio.length)filterProduct()
    },[checked, radio]);

    useEffect(()=>{
        getAllCategory();
    },[])

    const handleFilter = (value,id) => {
        let all = [...checked];
        if(value){
            all.push(id)
        }
        else{
            all = all.filter(c => c!==id)
        }
        setChecked(all);
    };
    
    const filterProduct = async() =>{
        try{
            const {data} = await axios.post('/api/v1/product/product-filters',{checked,radio})
            setProducts(data?.products)
        }catch(error){
            console.log(error);
        }
    }

    return (
        <Layout title={"All Products"}>
            <div className="row mt-2">
                <div className="col-md-3 align-items-center ">
                    <h4 className="mx-5 mt-3">Filter By Brand</h4>
                    <div className="d-flex flex-column mx-5">
                        {categories?.map(c=>(
                            <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    
                    <h4 className="mx-5 mt-3">Filter By Price</h4>
                    <div className="d-flex flex-column mx-5 ">
                        <Radio.Group onChange={e=>setRadio(e.target.value)}>
                            {Prices?.map(p=>(
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <button className="btn m-3" style={{width: '200px'}}  onClick={() => window.location.reload()}>Reset Filters</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <h1 className="text-center mt-4" style={{color: '#79155B', fontFamily: "Josefin Sans"}}>Product Catalogue</h1>
                    <div className="d-flex flex-wrap">
                        {products?.map((p)=>(
                            <div className="card m-2" style={{width:"18rem"}}>
                                <img src={p.photo} alt={p.name} style={{width: "15rem", height:"18rem", cursor:"pointer"}} className='card-img-top p-3'/>
                                <div className="card-body">
                                    <h6 className='card-title'>{p.name}</h6>
                                    <h4 className='card-text'><span>&#8377;</span>{p.price}</h4>
                                    <button className='btn' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ProductCategory;
