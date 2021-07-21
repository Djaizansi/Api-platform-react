import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {CredentialsContext} from "../Contexts/CredentialsContext";

export default function Accueil() {
    const {token, profil} = useContext(CredentialsContext);
    const string = token && profil !== undefined && profil !== null ? `Bonjour ${profil.username}` : 'Bienvenu';
    const id = profil !== undefined && profil !== null ? profil.id : '';
    const crud = [
        {name: "Créer un article",description:"Ajouter un article afin de montrer ses envies, l'actualités...",url:"/creer-un-article"},
        {name: "Gérer mes articles",description:"Afficher modifier, supprimer et publier ou non ses articles",url:"/mes-articles"},
        {name: "Afficher tous les articles",description:"Vous avez la possibilité d'afficher tous les articles",url:"/articles"},
    ]
    return (
        <div className="container mt-4">
            <div className="shadow p-3 mb-5 bg-white rounded text-center w-75 mx-auto">
                <p style={{ fontSize: "30px"}}> {string} </p>
                {token && (<p className="m-0">Que souhaitez-vous faire aujourd'hui ?</p>)}
                {token === null && (
                    <p className="m-0">
                        <Link to={{pathname:"/connexion"}}>Connectez-vous </Link> ou <Link to={{pathname:"/inscription"}}>Inscrivez-vous </Link>
                        pour avoir un accès complet au site
                    </p>
                )}
            </div>

            {token && (
                <div className="row justify-content-around m-lg-0 mx-4">
                    {
                        crud.map((item,key) =>
                            <div key={key} className="col-lg-3 col-12 shadow p-3 mb-5 bg-white rounded" style={{width: "18rem"}}>
                                <div className="card-body h-100 d-flex flex-column justify-content-between">
                                    <h5 className="text-center card-title">{item.name}</h5>
                                    <p className="text-center card-text">{item.description}</p>
                                    <Link to={item.url} className="btn btn-primary">
                                        Voir
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>
            )}
        </div>
    )
}
