import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from 'react'

import Navbar from "./Components/Navbar";
import Accueil from "./Layouts/Accueil";
import Contact from "./Layouts/Contact";
import Credentials from "./Layouts/Admin/Credentials";

import CredentialsProvider from "./Contexts/CredentialsContext";
import {ToastContainer} from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

function Home(){
    return (
        <>
            <Router>
                <CredentialsProvider>
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={Accueil} />
                        <Route path="/connexion" exact component={Credentials} />
                        <Route path="/contact" exact component={Contact} />
                        <Route path="/" component={() => <div>Erreur 404</div>} />
                    </Switch>
                </CredentialsProvider>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Home;
