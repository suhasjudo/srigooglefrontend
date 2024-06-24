import React,{useState, useEffect} from 'react';

const CategoryForm = ({handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control ml-5" placeholder="Enter New Brand" value={value} onChange={(e)=>setValue(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary ml-5 mt-3">Submit</button>
            </form>
        </>
    );
}

export default CategoryForm;
