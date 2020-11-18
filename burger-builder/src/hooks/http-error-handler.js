import { useState, useEffect } from 'react';

export default httpClient => {

    const [error, setError] = useState(null); 

    const reqIntercetptor = httpClient.interceptors.request.use(req => {
        setError(null)
        return req;
    });        
    const resIntercetptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err)
    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqIntercetptor);
            httpClient.interceptors.response.eject(resIntercetptor);
        };
    }, [reqIntercetptor, resIntercetptor, httpClient.interceptors.request, httpClient.interceptors.response]);

    const errorConfirmedHandler = () => {
        setError(null);
    }

    return [error, errorConfirmedHandler];

}