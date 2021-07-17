export function login(user, pass) {
    return fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({username: user, password: pass}),
    })
        .then(res => res.json())
        .then(data => data);
}
