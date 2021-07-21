import React, {useContext} from "react";
import {CredentialsContext} from "../../Contexts/CredentialsContext";
import Form from "../../Components/Form";
import {Redirect} from "react-router-dom";
import {newArticle} from "../../Actions/ArticleAction";
import {toast} from "react-toastify";

export default function ArticlesNew(){
    const {token} = useContext(CredentialsContext);
    const redirect = () => {
        window.location.href = 'http://127.0.0.1:8000/';
    }
    return (
        <>
            {token && (
                <div className="container mt-4">
                    <h1 className="text-center">Création d'un article</h1>
                    <Form onSubmit={(values) => newArticle(values,token).then(data => {
                        if(data === 201){
                            toast.success('✅ Article enregistré !');
                            setTimeout(redirect,2000);
                        }else{
                            toast.error('⚠️ Une erreur est survenue');
                        }
                    })}/>
                </div>
            )}
            {token === null && (
                <Redirect to="/" />
            )}
        </>
    );
}
