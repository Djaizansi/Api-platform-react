import React, {useEffect, useState} from "react";
import {deleteArticle} from "../Actions/ArticleAction";
import {toast} from "react-toastify";
import Item from "./Item";
import {useLocation} from "react-router-dom";
import Pagination from "./Pagination";

export default function List({data,loading,user,token}){
    const [newData, setNewData] = useState();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(10);

    useEffect(() => {
        token && (
            setNewData(data)
        )
    },[data])

    const deleteArticles = (id,token) => {
        deleteArticle(id,token).then(res => {
            if(res === 204){
                toast.success(`✅ Article supprimé !`);
                setNewData(newData.filter((item) => item.id !== id));
            }else{
                toast.error('⚠️ Une erreur est survenue');
            }
        });
    }

    const indexOfLastItem = currentPage * postPerPage;
    const indexOfFirstItem = indexOfLastItem - postPerPage;
    const currentItemsNow = newData && (newData.slice(indexOfFirstItem, indexOfLastItem));
    const myData = newData && (location.pathname === "/mes-articles" ? currentItemsNow : newData);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            {loading ? (
                <span className="fa fa-spin fa-spinner fa-4x mt-2"></span>
            ) : newData && (
                newData.length > 0 ? (
                    <>
                        <div className="d-flex flex-wrap justify-content-center">
                            { myData.map((item) =>
                                (location.pathname === "/mes-articles" || (location.pathname === "/articles" && item.published)) ?
                                    <Item key={item.id} item={item} onDelete={deleteArticles} user={user} token={token}/> : ''
                            )}
                        </div>

                        {location.pathname === "/mes-articles" && (
                            <>
                                <Pagination
                                    postsPerPage={postPerPage}
                                    totalPosts={newData.length}
                                    paginate={paginate}
                                />
                            </>
                        )}
                    </>

                ) : newData.length === 0 && (
                    <p>Vous n'avez aucun article pour l'instant</p>
                )
            )}
        </>
    )
}
