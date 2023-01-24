import React from 'react';
import { GoogleLogout } from 'react-google-login';

const Logout = ({
        user,
        signOut,
        clientId
    }) => {

    return (
        <div>
            {user !== null && (<>             
                    <GoogleLogout 
                        clientId={clientId} 
                        buttonText="Log out" 
                        onLogoutSuccess={signOut}
                     />
               </>   
            )}
        </div>
    );
}

export default Logout
