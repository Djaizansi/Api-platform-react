import React, {useContext} from 'react'
import {Link, NavLink} from 'react-router-dom';
import {CredentialsContext} from "../Contexts/CredentialsContext";

export default function Navbar() {
    const {token, logout} = useContext(CredentialsContext);
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
                        <NavLink exact className="nav-link" activeClassName="active" to="/contact">
                            Contact
                        </NavLink>
                    </li>

                    {token === null && (
                        <li className="nav-item">
                            <NavLink exact className="nav-link" activeClassName="active" to="/connexion">
                                Connexion
                            </NavLink>
                        </li>
                    )}

                    {token && (
                        <li className="nav-item">
                            <button onClick={logout} className="nav-link border-0 bg-transparent">
                                Déconnexion
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}
