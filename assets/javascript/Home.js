import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from 'react'
import Navbar from "./Components/Navbar";
import Accueil from "./Layouts/Accueil";

function Home(){

    return (
        <>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Accueil} />
                    <Route path="/" component={() => <div>Erreur 404</div>} />
                </Switch>
            </Router>
        </>
    )
}

export default Home;
