import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Contact from "./pages/Contact";
import BookingHistory from "./pages/BookingHistory";
import Reservation from "./pages/Reservation";
import Success from "./pages/Success";
import Footer from "./components/Footer";



const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
            <Nav />
            
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/bookingHistory" component={BookingHistory} />
              <Route exact path="/reservation" component={Reservation} />
              <Route exact path="/rooms/:id" component={Detail} />
              <Route exact path="/success" component={Success} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/contact" component={Contact} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
        </div>
      
      </Router>
    </ApolloProvider>

  );
}

export default App;