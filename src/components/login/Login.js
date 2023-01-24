import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../redux/store';
//import { signIn, signOut } from '../../redux/actions/currentUser'
import AuthConfig from '../authentification'

const Login = ({
    clientId,
    signIn
}) => {  

    const onSuccess = (res) => {
        signIn(res.profileObj)
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const [buttonText, setbuttonText] = useState("Sign in with Google")

    return (
        
        <div>
            <div className="card">
            <AuthConfig />           
            <GoogleLogin
                    clientId={clientId}
                    buttonText={buttonText}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div> 
        </div> 
    );
}

export default Login
