import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import useCurrentUser from "../Hooks/useCurrentUser";

export default function Navbar() {
    const currentUser = useCurrentUser();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className={"navbar-brand"} to={"/"}> React </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to="/">
                            Accueil
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to="/projets">
                            Projets
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to="/contact">
                            Contact
                        </NavLink>
                    </li>

                    {!currentUser ? (
                        <li className="nav-item">
                            <NavLink exact className="nav-link" activeClassName="active" to="/connexion">
                                Connexion
                            </NavLink>
                        </li>
                    ) : ''}

                    {currentUser ? (
                        <li className="nav-item">
                            <NavLink exact className="nav-link" to="/deconnexion">
                                Déconnexion
                            </NavLink>
                        </li>
                    ) : ''}
                </ul>
            </div>
        </nav>
    )
}
