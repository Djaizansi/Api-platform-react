import React, {useContext, useEffect, useState} from "react";
import {CredentialsContext} from "../../Contexts/CredentialsContext";

import {findAll} from "../../Actions/ArticleAction";
import List from "../../Components/List";
import {Redirect} from "react-router-dom";
import Back from "../../Components/Back";

export default function Articles(){
    const [data, setData] = useState();
    const {token, profil} = useContext(CredentialsContext);
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            })
        )
    }, []);

    return (
        <>
            {token ? (
                <div className="mt-4 mx-3">
                    <h1 className="text-center">Articles</h1>
                    <Back url="/" title="Retour à l'accueil"/>
                    <div className="d-flex flex-wrap justify-content-center">
                        <List data={data} loading={loading} user={profil} token={token}/>
                    </div>
                </div>
            ) : <Redirect to='/' />}
        </>
    );
}
