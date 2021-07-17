import React, {useContext} from "react";
import {CredentialsContext} from "../../Contexts/CredentialsContext";
import CredentialsForm from "./CredentialsForm";
import { Redirect } from "react-router-dom";

export default function Credentials(){
    const {token, login} = useContext(CredentialsContext);
    return (
        <>
            {token && (
                <Redirect to='/' />
            )}
            {token === null && (
                <CredentialsForm
                    onSubmit={values => login(values.username, values.password)}
                />
            )}
        </>
    );
}
