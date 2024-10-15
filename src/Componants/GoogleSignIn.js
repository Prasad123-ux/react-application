import React, { useEffect } from 'react';
// import axios from 'axios';
import axios from 'axios';

const GoogleSignIn = () => {

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '940799872663-6cu5gsjqgi5iji4m17el67hm170tm86e.apps.googleusercontent.com',          
            callback: handleCredentialResponse                                                       
        });

        google.accounts.id.renderButton(
            document.getElementById("g_id_signin"),
            { theme: "outline", size: "large" } // customization options
        );
    }, []);

    const handleCredentialResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        
        // Send the token to your backend for verification
        axios.post('   http://localhost:5000/api/candidate/google', {
            token: response.credential
        })
        .then(response => {
            console.log('Backend response:', response.data);
            // Handle successful authentication (e.g., store user info, redirect)
        })
        .catch(error => {
            console.error('Error during authentication:', error);
        });
    };

    return (
        <div>
            <div id="g_id_onload"
                 data-client_id="940799872663-6cu5gsjqgi5iji4m17el67hm170tm86e.apps.googleusercontent.com"
                 data-callback="handleCredentialResponse">
            </div>
            <div id="g_id_signin">  google sign in  button</div>
        </div>
    );
};

export default GoogleSignIn;
