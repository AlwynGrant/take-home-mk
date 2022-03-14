import { useEffect, useReducer, useState } from 'react';
import NewSlide from './newSlide';
import './styles/login.css'

function Login() {
    const [signedIn, setSignedIn] = useState(false);
    const [content, setContent] = useState('');
    const [presentation, setPresentation] = useState([]); // for future use if appicable
    const [error, setError] = useState([])


    let CLIENT_ID = '1090889681153-383uh54u0dehk7d22sgah3puo8n7hksh.apps.googleusercontent.com';
    let API_KEY = 'AIzaSyCuSBNjCyJFrt4TfvKJRfWBYiC-N-zbPDo';
    let DISCOVERY_DOCS = ["https://slides.googleapis.com/$discovery/rest?version=v1"];
    let SCOPES = "https://www.googleapis.com/auth/presentations.readonly https://www.googleapis.com/auth/drive.file"


    function handleAuthClick(e) {
        window.gapi.auth2?.getAuthInstance().signIn()
            .then(() => {
                setSignedIn(window.gapi.auth2?.getAuthInstance().isSignedIn.I4.value);
            })
    }

    function handleSignoutClick(e) {
        window.gapi.auth2?.getAuthInstance().signOut()
            .then(() => {
                setSignedIn(window.gapi.auth2?.getAuthInstance().isSignedIn.I4.value);
            })
    }

    function initClient() {
        window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
            setSignedIn(window.gapi.auth2?.getAuthInstance().isSignedIn.I4.value)
        }, function(error) {
            setError(JSON.stringify(error, null, 2));
        });
    }

    const LoginCheck = () => {
        return (
            <div className='login-body'>
                <div className="login-container">
                    <div className='login-header'>
                        Login to continue!
                    </div>
                    <button onClick={(e) => handleAuthClick(e)} className='login-btn'>
                        Login
                    </button>
                </div>
            </div>
        )
    }

    const Form = () => {
        return (
                <div className="login-container">
                    <button onClick={(e) => handleSignoutClick(e)} className='logout-btn'>
                        Logout
                    </button>
                    <NewSlide
                        presentation={presentation}
                    />
                </div>
        )
    }

    useEffect(async() => {
        await window.gapi?.load('client:auth2', initClient)
            .then(() => {
                setSignedIn(window.gapi.auth2?.getAuthInstance().isSignedIn.I4.value);
            })
    }, [signedIn])


  return (
    ( signedIn
     ? <Form />
     : <LoginCheck />
     )
  );
}

export default Login;
