import React, {useContext, useEffect, useState} from "react";
import {deleteArticle, findByIdUser} from "../../Actions/ArticleAction";
import {CredentialsContext} from "../../Contexts/CredentialsContext";
import {Redirect} from "react-router-dom";
import Card from "../../Components/Card";
import {toast} from "react-toastify";

export default function ArticlesUser(){
    const [data, setData] = useState();
    const {token, profil} = useContext(CredentialsContext);

    const deleteArticles = (id,token) => {
        deleteArticle(id,token).then(res => {
            if(res === 204){
                toast.success(`✅ Article supprimé !`);
                setData(data.filter((it) => it.id !== id));
            }else{
                toast.error('⚠️ Une erreur est survenue');
            }
        });
    }

    useEffect(() => {
        token && (
            findByIdUser(profil.id,token).then(data => {
                setData(data.articles.map(item => {
                    const obj = {};
                    obj.id = item.id;
                    obj.title = item.title;
                    obj.content = item.content;
                    return obj;
                }));
            })
        )
    }, []);
    return (
        <>
            {token ? (
                <div className="mt-4 mx-3">
                    <h1 className="text-center">Mes articles</h1>
                    <div className="d-flex flex-wrap justify-content-center">
                        {data && (
                            data.length > 0 ? (
                                data.map((item) =>
                                    <Card
                                        key={item.id}
                                        title={item.title}
                                        content={item.content}
                                        token={token}
                                        id={item.id}
                                        onDelete={deleteArticles}
                                    />
                                )
                            ) : data.length === 0 && (
                                <p>Vous n'avez aucun article pour l'instant</p>
                            )
                        )}
                    </div>
                </div>
            ) : <Redirect to='/' />}
        </>
    );
}
