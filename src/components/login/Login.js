import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import AuthConfig from '../authentification'
import CustomButton from '../../customComponents/customButton/CustomButton';
import {
    LoginWrapper,
    ButtonContainer,
} from '../../customComponents/loginStyled';
import colors from '../../themeManager/colors';
import googleImage from '../../assets/images/google.svg';

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

    return (
        
        <div>
            <AuthConfig />           
            <GoogleLogin
                    clientId={clientId}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                    render={renderProps => (
                        <LoginWrapper>
                            <ButtonContainer>
                                <CustomButton
                                    text={'Login with Google'}
                                    image={googleImage}
                                    callback={renderProps.onClick}
                                    borderColor={colors.loginButtonBorderColor}
                                    isInversionTextColor
                                >
                                </CustomButton>
                            </ButtonContainer>
                        </LoginWrapper>
                    )}
                />
        </div> 
    );
}

export default Login
