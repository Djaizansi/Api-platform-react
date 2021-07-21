import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {findArticleById} from "../../Actions/ArticleAction";
import Moment from 'react-moment';
import 'moment-timezone';
import Back from "../../Components/Back";

export default function ArticlesShow(){
    const [data, setData] = useState();
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        findArticleById(id).then(data => {
            data["hydra:description"] && (history.push('/'));
            const obj = {};
            obj.id = data.id;
            obj.title = data.title;
            obj.content = data.content;
            obj.tags = data.tags;
            obj.publishedAt = data.publishedAt;
            obj.createdAt = data.createdAt;
            obj.author = data.author;
            setData(obj);
        })
        return () => {
            setData('');
        }
    }, []);

    return (
        <>
            {data &&(
                <div className="container">
                    <h1 className="text-center mt-3">{data.title.charAt(0).toUpperCase() + data.title.slice(1)}</h1>
                    <div className="mt-3 text-center shadow p-3 rounded w-75 mx-auto">
                        <i><p><strong>Créer par : </strong> {data.author.username}</p></i>
                        <i><p><strong>Créer le : </strong><Moment format="DD/MM/YYYY HH:mm">{data.createdAt}</Moment></p></i>
                        <i><p>{data.publishedAt !== null ? (<><strong>Publié le : </strong><Moment format="DD/MM/YYYY HH:mm">{data.publishedAt}</Moment></>) : "L'article n'est pas publié"}</p></i>
                        <div className="d-flex justify-content-center align-items-center">
                            <i><p className="m-0 mr-2"><strong>Tags : </strong></p> </i>{data.tags.map((tag) => <span key={tag.label} className="badge badge-primary mr-2">{tag.label}</span>)}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <p className="m-0" style={{fontSize: "20px"}}>{data.content}</p>
                    </div>
                    <Back url="/mes-articles" title="Retour à mes articles"/>
                </div>
            )}
        </>
    );
}
