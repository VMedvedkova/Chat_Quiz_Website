import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { 
    sendUnsetQuizReadiness
} from '../../firebase/quizMethods'
import CustomButton from '../../customComponents/customButton/CustomButton';

const Logout = ({
        user,
        signOut,
        clientId,
        resetInitialState
    }) => {

    const handleClick = (id) => {
        sendUnsetQuizReadiness(id)
        resetInitialState()
        signOut()
    } 

    return (
        <div>
            {user !== null && (<>             
                    <GoogleLogout 
                        clientId={clientId} 
                        // buttonText="Log out" 
                        onLogoutSuccess={() => handleClick(user.googleId)}
                        render={renderProps => (
                                    <CustomButton
                                        text={"Logout"}
                                        // image={googleImage}
                                        callback={renderProps.onClick}
                                        // borderColor={colors.loginButtonBorderColor}
                                        // isInversionTextColor
                                    >
                                    </CustomButton>
                        )}
                     />
               </>   
            )}
        </div>
    );
}

export default Logout
