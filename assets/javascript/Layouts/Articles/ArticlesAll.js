import React, {useEffect, useState} from "react";

import {findAllWithoutConnection} from "../../Actions/ArticleAction";
import Back from "../../Components/Back";
import Item from "../../Components/Item";

export default function ArticlesAll(){
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        findAllWithoutConnection().then(data => {
            setData(data["hydra:member"].sort(() => Math.random() - 0.5).map(item => {
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
    }, []);

    return (
        <>
                <div className="mt-4 mx-3">
                    <h1 className="text-center">Tous les articles</h1>
                    <Back url="/" title="Retour à l'accueil"/>
                    <div className="d-flex flex-wrap justify-content-center">
                        {loading ? (
                            <span className="fa fa-spin fa-spinner fa-4x mt-2"></span>
                        ) : (
                            data.map(item => <Item key={item.id} item={item} />)
                        )}
                    </div>
                </div>
        </>
    );
}
