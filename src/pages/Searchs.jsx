import React from 'react';
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/Search';
import { useNavigate } from 'react-router-dom';

const Searchs = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    return (
        <Layout title={"Search results"}>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? 'No Products Found ':`Found ${values?.results.length}`}</h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((p)=>(
                            <div className="card m-2" style={{width:"18rem"}}>
                                <img src={p.photo} alt={p.name} style={{width: "15rem", height:"18rem", cursor:"pointer"}} className='card-img-top p-3'/>
                                <div className="card-body">
                                    <h5 className='card-title'>{p.name}</h5>
                                    <p className='card-text'><span>&#8377;</span>{p.price}</p>
                                    <button className='btn btn-primary' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className='btn' onClick={() => navigate('/product-category')}>Go Back</button>
                </div>
            </div>
        </Layout>
    );
}

export default Searchs;
