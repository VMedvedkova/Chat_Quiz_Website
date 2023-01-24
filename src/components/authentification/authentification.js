import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../redux/store';
import { signIn, signOut } from '../../redux/actions/currentUser'

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
