import React, {useContext, useEffect, useState} from "react";
import {CredentialsContext} from "../../Contexts/CredentialsContext";
import Form from "../../Components/Form";
import {useHistory, Redirect, useLocation, useParams} from "react-router-dom";
import {findArticleById, gestionArticle} from "../../Actions/ArticleAction";
import {toast} from "react-toastify";
import Back from "../../Components/Back";

export default function ArticlesNew(){
    const [item, setItem] = useState();
    const {token} = useContext(CredentialsContext);
    const history = useHistory();
    const location = useLocation();
    const {id} = useParams();

    useEffect(() => {
        if(id !== undefined && id !== null){
            findArticleById(id).then(data => {
                data["hydra:description"] && (history.push('/'));
                const obj = {};
                obj.title = data.title;
                obj.content = data.content;
                obj.isPublished = data.isPublished;
                obj.tags = data.tags.map(tag => {
                    return tag.label;
                })
                setItem(obj);
            })
            return () => {
                setItem('');
            }
        }
    }, []);

    return (
        <>
            {token && (
                <div className="container mt-4">
                    <h1 className="text-center">Création d'un article</h1>
                    <Form
                        defaultValues={item}
                        onSubmit={(values) => gestionArticle(
                            values,
                            token,
                            location.pathname === "/creer-un-article" ? "POST" : "PUT",
                            id !== undefined ? id : null
                        ).then(data => {
                            if(data === 201 || data === 200){
                                toast.success(`${location.pathname === "/creer-un-article" ? "✅ Article enregistré" : "✏️ Article modifié"} !`);
                                history.push('/');
                            }else{
                                toast.error('⚠️ Une erreur est survenue');
                            }
                    })}/>
                </div>
            )}
            {token === null && (
                <Redirect to="/" />
            )}
            <Back url={location.pathname === "/creer-un-article" ? "/" : "/articles"} title={location.pathname === "/creer-un-article" ? "Retour à l'accueil" : "Retour aux articles"}/>
        </>
    );
}
