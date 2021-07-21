export function findByIdUser(id,token) {
    return fetch(`http://127.0.0.1:8000/api/users/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: "BEARER " + token,
        }
    })
        .then(res => res.json())
        .then(data => data);
}

export function findAll(token) {
    return fetch(`http://127.0.0.1:8000/api/articles`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: "BEARER " + token,
        }
    })
        .then(res => res.json())
        .then(data => data);
}

export function deleteArticle(id,token) {
    return fetch(`http://127.0.0.1:8000/api/articles/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            Authorization: "BEARER " + token,
        }
    })
        .then(res => res.status)
        .then(data => data);
}

export function gestionArticle(values,token,method,id=null) {
    const newTags = [];
    const data = values.tags;
    data.map(tag => newTags.push({label:tag}));
    values.tags = newTags;
    return fetch(`http://127.0.0.1:8000/api/articles${id !== null ? '/'+id : ''}`, {
        method: `${method}`,
        headers: {
            'content-type': 'application/json',
            Authorization: "BEARER " + token
        },
        body: JSON.stringify(values)
    })
        .then(res => res.status)
        .then(data => data);
}

export function findArticleById(id) {
    return fetch(`http://127.0.0.1:8000/api/articles/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(data => data);
}
