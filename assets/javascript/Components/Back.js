import React from "react";
import {Link} from "react-router-dom";

export default function Back({url,title}){
    return (
        <div className="d-flex justify-content-center mt-3">
            <Link to={url} className="btn btn-primary">{title}</Link>
        </div>
    )
}
