import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import './Verification.css';
import Grid from '@material-ui/core/Grid';

export default function App() {

    const [phoneNum, setPhoneNum] = useState("");
    const [verificationClicked, setVerificationClicked] = useState(false);

    // initialize timeLeft with the seconds prop
    const [timeLeft, setTimeLeft] = useState(60);

    function handleClick(event){
        setVerificationClicked(true);
        setTimeLeft(60);
    }

    useEffect(() => {
        // exit early when we reach 0
        if (!timeLeft) return;
    
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        }, 1000);
    
        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft]);
 
    
    //counter
    // {verificationClicked ? 
    //     timeLeft > 0 ? <p> {timeLeft}s </p> : <p> Send the code again? </p>  
    //     : null
    // }




  return (
        <div className="signUp">
            <div className="verification-container">
                <div className="title">
                    <h1> Join Moment </h1>
                </div>   
                <h2> Enter your phone number to get started </h2>
                <div className="verification-input-container">
                    <input className= "verification-input" 
                            type="tel"
                            placeholder="(___)___-____" />
                    <div className = "auth-container">
                        <button className='verification-button' onClick={handleClick}>
                            Send verification code
                        </button>
                    </div>
                </div>
            </div>
        </div>
  );
}