import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';


const App = () => (
<GoogleOAuthProvider clientId='765196494731-bog3pn96ud8j5svek7f1cr8ign1ravi5.apps.googleusercontent.com'>
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
      </Switch>
    </Container>
  </BrowserRouter>
  </GoogleOAuthProvider>
);

export default App;