import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Helmet} from 'react-helmet';
import {ToastContainer} from 'react-toastify';
import {Toaster} from 'react-hot-toast';

export default function Layout({children,title}){
    return(
        <div>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{minHeight: '80vh'}}>
                <Toaster />
                {children}
            </main>
            <Footer />
        </div>
    )
};