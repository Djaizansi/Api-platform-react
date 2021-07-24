import React, {useEffect, useState} from "react";
import { TagsInput } from "react-tag-input-component";
import {toast} from "react-toastify";
import {entierAleatoire} from "../Helpers";

export default function Form({ onSubmit, defaultValues }) {
    const [loading, setLoading] = useState(true);
    const [loadingPost, setLoadingPost] = useState(false);
    const [values, setValues] = useState({
        title: "",
        content: "",
        isPublished: false,
    });

    useEffect(() => {
        if(defaultValues !== undefined && defaultValues !== null) {
            setValues(defaultValues);
        }
        setTimeout(() => {
            setLoading(false)
        },500);
    },[defaultValues])


    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.name === "isPublished" ? event.target.checked : event.target.value,
        });
    };

    const handleSubmit = () => {
        setLoadingPost(true);
        const aleatoire = entierAleatoire(1000,6000);
        console.log(aleatoire);
        setTimeout(() => {
            if(values.title !== '' && values.content !== '' && values.tags.length > 0){
                onSubmit(values);
            }else{
                toast.error('⚠️ Un champ n\'est pas rempli !');
            }
        },aleatoire);
    };

    return (
        loading ? (
                <div className="d-flex justify-content-center">
                    <span className="fa fa-spin fa-spinner fa-4x mt-2"></span>
                </div>
            ) :
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
                            value={values.tags}
                            name="tags"
                            placeHolder="Entrez vos tags..."
                            onChange={newTags => setValues({...values, tags: newTags})}
                        />
                    </div>
                    <div className="d-flex custom-control custom-switch mb-3">
                        <input type="checkbox" className="custom-control-input" id="customSwitch1" name="isPublished" onChange={handleChange} defaultChecked={values.isPublished}/>
                        <label className="custom-control-label" htmlFor="customSwitch1">Voulez-vous publiez votre article ?</label>
                    </div>
                    <button className="btn btn-info w-100" onClick={handleSubmit}>{!loadingPost ? "Valider" :
                        <i className="fas fa-circle-notch fa-spin"></i>}</button>
                </div>
    );
}
