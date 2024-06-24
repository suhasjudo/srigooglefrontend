import { useState } from 'react'
import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Dashboard from './pages/users/Dashboard';
import Private from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoutes from './components/Routes/AdminRoutes';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Contactdetails from './pages/Admin/Contactdetails'
import Users from './pages/Admin/Users';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import ProductCategory from './pages/ProductCategory';
import Searchs from './pages/Searchs';
import ProductDetails from './pages/ProductDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/product/:slug" element={<ProductDetails/>}/>
        <Route path="/search" element={<Searchs/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>} />
        <Route path="/product-category" element={<ProductCategory/>} />
        <Route path='*' element={<PageNotFound/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path="/dashboard" element={<Private/>}>
          <Route path='user' element={<Dashboard/>} />
        </Route>
        <Route path='/dashboard' element={<AdminRoutes/>}>
          <Route path='admin' element={<AdminDashboard/>} />
          <Route path='admin/create-category' element={<CreateCategory/>} />
          <Route path='admin/create-product' element={<CreateProduct/>} />
          <Route path='admin/product/:slug' element={<UpdateProduct/>} />
          <Route path='admin/products' element={<Products/>} />
          <Route path='admin/users' element={<Users/>} />
          <Route path='admin/contacts' element={<Contactdetails/>} />
        </Route>

      </Routes>
    </>
  )
}

export default App;
