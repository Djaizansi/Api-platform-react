import React from "react";
import {useHistory} from "react-router-dom";

export default function Item({item, onDelete, token, user}){
    const history = useHistory();
    const redirect = (string) => {
        history.push(`/articles/${string}`)
    }
    return (
        <div className="p-3 mb-5" style={{width: "20rem"}}>
            <div className="card-body h-100 shadow d-flex bg-white rounded flex-column justify-content-between">
                <h5 className="text-center card-title">{item.title}</h5>
                <p className="text-center card-text">{item.content.length > 25 ? (item.content.slice(0,25) + '...') : item.content}</p>
                <div className="d-flex justify-content-around">
                    <button className="btn btn-primary" onClick={() => redirect(item.id)}><i className="fas fa-eye"></i></button>
                    {(location.pathname === "/mes-articles" || (item.authorId === user.id || user.roles.includes('ROLE_ADMIN'))) && (
                        <>
                            <button className="btn btn-warning" onClick={() => redirect(`edit/${item.id}`)}><i className="fas fa-pencil-alt"></i></button>
                            <button className="btn btn-danger" onClick={() => onDelete(item.id,token)}><i className="fas fa-trash-alt"></i></button>
                        </>
                    )}
                </div>
                {location.pathname === "/mes-articles" && (
                    <div className="text-center">
                        <p className="m-0 mt-2"  style={item.isPublished ? {color: "green"} : {color: "grey"}}><i className="fas fa-circle"></i>{item.isPublished ? " Publié" : " Non publié"}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
