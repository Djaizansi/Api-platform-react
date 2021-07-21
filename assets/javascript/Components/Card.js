import React from "react";

export default function Card({title,content,author,user,token,id,onDelete}){
    return (
        <div className="p-3 mb-5" style={{width: "20rem"}}>
            <div className="card-body h-100 shadow d-flex bg-white rounded flex-column justify-content-between">
                <h5 className="text-center card-title">{title}</h5>
                <p className="text-center card-text">{content.length > 25 ? (content.slice(0,25) + '...') : content}</p>
                <div className="d-flex justify-content-around">
                    <button className="btn btn-primary">Show</button>
                    {author === user && (
                        <>
                            <button className="btn btn-warning">Edit</button>
                            <button className="btn btn-danger" onClick={() => {onDelete(id,token)}}>Delete</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
