import React from 'react';
import '../../App.css';
import './Welcome.css';

export default function Welcome() {
    return (
        <div className="welcome">  
            <div className="text-container">
                <h1>Welcome!</h1>
                <p>you have successfully registered a new account!</p>
                <p>we've sent you a email. Please click on the fonfirmation link to verify your account</p>
            </div>
        </div>
    )
}