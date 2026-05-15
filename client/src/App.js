import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// React pages and components
import NavComp from "./components/Nav";
import Login from "./pages/Login";
import AddRecipePage from "./pages/AddRecipe";
import GroceryListPage from "./pages/GroceryList";
import ExplorePage from "./pages/Explore";
import HomePage from "./pages/Home";
import SignupPage from "./pages/Signup";

// React bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "./utils/auth";

const httpLink = createHttpLink({ uri: '/graphql' });

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {

  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn())

  return (
    <ApolloProvider client={client}>
      <Router>
        <NavComp loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <Routes>
          <Route
            path="/"
            element={<HomePage />} 
          />
          <Route 
            path="/signup"
            element={<SignupPage setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} />}
          />
          <Route 
            path="/add"
            element={<AddRecipePage />}
          />
          <Route 
            path="/list"
            element={<GroceryListPage />}
          />
          <Route 
            path="/explore"
            element={<ExplorePage />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
