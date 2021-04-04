import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import LogIn from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';
import Welcome from './components/pages/Welcome';
import Verification from './components/pages/Verification';
import { Auth } from 'aws-amplify';

function App() {

  const [isAuthenticated, setAuthState] = useState(false);
  const [user, setUser] = useState({});

  const authProps = {
    isAuthenticated: isAuthenticated,
    user: user,
    configAuthState: setAuthState,
    configUser: setUser 
  }

  useEffect(() => {
    async function fetchAuthState() {
      try {
        const session = await Auth.currentSession();
        setAuthState(true);
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
        console.log(session);
      } catch (error){
        console.log(error);
      }
    }
    fetchAuthState();
  }, []);


  return (
    <Router>
      <Navbar auth={authProps} />
      <Switch>
        <Route exact path='/' render={(props) => <Home {...props} auth={authProps} />} />
        <Route path='/services' render={(props) => <Services {...props} auth={authProps} />} />
        <Route path='/logIn' render={(props) => <LogIn {...props} auth={authProps} />} />
        <Route path='/signUp' render={(props) => <SignUp {...props} auth={authProps} />} />
        <Route path='/welcome' render={(props) => <Welcome {...props} auth={authProps} />} />
        <Route path='/verification' render={(props) => <Verification {...props} auth={authProps} />} />
      </Switch>
      <Footer />
    </Router>

  );
}

export default App;
