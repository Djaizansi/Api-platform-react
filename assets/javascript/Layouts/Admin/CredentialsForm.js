import React, {useState} from 'react';

export default function CredentialsForm({onSubmit, defaultValues}) {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {
        onSubmit(values);
    };


    return (
        <>
            <h2 className="text-center mt-2">Connectez-vous</h2>

            <div className="my-3 mx-5 px-5">
                <label htmlFor="username">Votre pseudo</label>
                <input onChange={handleChange} className="form-control mb-2" name="username" id="username" type="text" value={values.username} placeholder="Entrez votre pseudo..." required />

                <label htmlFor="password">Votre mot de passe</label>
                <input onChange={handleChange} className="form-control" name="password" id="password" type="password" value={values.password} placeholder="Entrez votre mot de passe..." required />

                <button className="w-100 btn btn-info mt-2" onClick={handleSubmit}>Connexion</button>
            </div>
        </>
    )
}
