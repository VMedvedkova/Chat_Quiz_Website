import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useSelector, useDispatch } from 'react-redux';
import store from '../redux/store';
import { signIn, signOut } from '../redux/actions/currentUser'
import Login from '../components/login'
import { CustomWrapper } from '../customComponents/customWrapper';

function LoginPage() {  

    return (
        <CustomWrapper>
             <Login/>
        </CustomWrapper>
    );
}

export default LoginPage
