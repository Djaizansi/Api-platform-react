import React, {useContext, useEffect, useState} from "react";
import {CredentialsContext} from "../../Contexts/CredentialsContext";

import {deleteArticle, findAll} from "../../Actions/ArticleAction";
import Card from "../../Components/Card";
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";

export default function Articles(){
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
            findAll(token).then(data => {
                setData(data["hydra:member"].map(item => {
                    const obj = {};
                    obj.id = item.id;
                    obj.title = item.title;
                    obj.content = item.content;
                    obj.authorId = item.author.id;
                    obj.published = item.isPublished;
                    return obj;
                }));
            })
        )
    }, []);

    return (
        <>
            {token ? (
                data && (
                    <div className="mt-4 mx-3">
                        <h1 className="text-center">Articles</h1>
                        <div className="d-flex flex-wrap justify-content-center">
                            {
                                data.length > 0 ? (
                                    data.map(item => {
                                        return !item.isPublished && (
                                            <Card
                                                key={item.id}
                                                title={item.title}
                                                content={item.content}
                                                author={item.authorId}
                                                user={profil.id}
                                                token={token}
                                                id={item.id}
                                                onDelete={deleteArticles}
                                            />
                                        )
                                    })
                                ) : <p>Aucun article n'est disponible</p>
                            }
                        </div>
                    </div>
                )
            ) : <Redirect to='/' />}
        </>
    );
}
