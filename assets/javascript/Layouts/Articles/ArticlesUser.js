import React, {useContext, useEffect, useState} from "react";
import {findByIdUser} from "../../Actions/ArticleAction";
import {CredentialsContext} from "../../Contexts/CredentialsContext";
import {Redirect} from "react-router-dom";
import List from "../../Components/List";
import Back from "../../Components/Back";

export default function ArticlesUser(){
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const {token, profil} = useContext(CredentialsContext);

    useEffect(() => {
        token && (
            findByIdUser(profil.id,token).then(data => {
                setData(data.articles.map(item => {
                    const obj = {};
                    obj.id = item.id;
                    obj.title = item.title;
                    obj.content = item.content;
                    obj.isPublished = item.isPublished
                    return obj;
                }));
                setLoading(false);
            })
        )
    }, []);
    return (
        <>
            {token ? (
                <div className="mt-4 mx-3">
                    <h1 className="text-center">Mes articles</h1>
                    <Back url="/" title="Retour à l'accueil"/>
                    <div className="d-flex flex-wrap justify-content-center">
                        <List data={data} loading={loading} user={profil} token={token}/>
                    </div>
                </div>
            ) : <Redirect to='/' />}
        </>
    );
}
