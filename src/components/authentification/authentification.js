import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const AuthConfig = ({
    clientId
}) => {
    useEffect(() => {
        const initClient = () => {
            gapi.auth2.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });
}

export default AuthConfig
