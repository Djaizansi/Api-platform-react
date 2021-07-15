import React,{useState, useEffect} from 'react';

export default function useCurrentUser(){
    const [user, setUser] = useState('null');

    useEffect(() => {
        const localUser = localStorage.getItem('user');
        if(localUser) {
            setUser(JSON.parse(localUser));
        }
    },[]);

    if(typeof user === 'object'){
        return user;
    }
}
