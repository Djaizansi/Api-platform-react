import React, {useEffect, useState} from "react";
import {deleteArticle} from "../Actions/ArticleAction";
import {toast} from "react-toastify";
import Item from "./Item";
import {useLocation} from "react-router-dom";

export default function List({data,loading,user,token}){
    const [newData, setNewData] = useState();
    const location = useLocation();

    useEffect(() => {
        token && (
            setNewData(data)
        )
    })

    const deleteArticles = (id,token) => {
        deleteArticle(id,token).then(res => {
            if(res === 204){
                toast.success(`✅ Article supprimé !`);
                setNewData(data.filter((item) => item.id !== id));
            }else{
                toast.error('⚠️ Une erreur est survenue');
            }
        });
    }

    return (
        <>
            {loading ? (
                <span className="fa fa-spin fa-spinner fa-4x mt-2"></span>
            ) : newData && (
                newData.length > 0 ? (
                    newData.map((item) =>
                        (location.pathname === "/mes-articles" || (location.pathname === "/articles" && item.published)) ?
                        <Item key={item.id} item={item} onDelete={deleteArticles} user={user} token={token}/> : ''
                    )
                ) : newData.length === 0 && (
                    <p>Vous n'avez aucun article pour l'instant</p>
                )
            )}
        </>
    )
}
