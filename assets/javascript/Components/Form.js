import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import {toast} from "react-toastify";

export default function Form({ onSubmit, defaultValues }) {
    const [values, setValues] = useState(
        defaultValues || {
            title: "",
            content: "",
        }
    );

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {
        if(values.title !== '' && values.content !== '' && values.tags.length > 0){
            onSubmit(values);
        }else{
            toast.error('⚠️ Un champ n\'est pas rempli !');
        }
    };

    return (
        <div className="w-50 mx-auto">
            <label>Titre :</label>
            <input
                className="form-control mb-2"
                value={values.title}
                name="title"
                placeholder="Mon article..."
                onChange={handleChange}
            />

            <label>Contenu :</label>
            <textarea
                value={values.content}
                className="form-control mb-2"
                name="content"
                placeholder="Voici mon article..."
                onChange={handleChange}
            />

            <label>Tags :</label>
            <div className="mb-3">
                <TagsInput
                    name="tags"
                    placeHolder="Entrez vos tags..."
                    onChange={newTags => setValues({...values, tags: newTags})}
                />
            </div>
            <button className="btn btn-info w-100" onClick={handleSubmit}>Valider</button>
        </div>
    );
}
