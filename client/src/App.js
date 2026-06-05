import React, { useState } from "react";
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
import AddRecipe from "./pages/AddRecipe";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Recipe from "./pages/Recipe";
import SearchResults from "./pages/Search";
import SavedRecipes from "./pages/SavedRecipes";
import GroceryListsRedirect from "./pages/GroceryListRedirect";
import NewGroceryList from "./pages/NewGroceryList";
import GroceryList from "./pages/GroceryList";
import MyRecipesPage from "./pages/MyRecipes";
import MyRecipe from "./pages/MyRecipe";
import EditRecipe from "./pages/EditRecipe";
import CommunityRecipe from "./pages/CommunityRecipe";

// React bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL || "http://localhost:3001/graphql"
});

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
        <NavComp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={<Home loggedIn={loggedIn} />}
          />
          <Route
            path="/signup"
            element={<Signup setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} />}
          />
          <Route
            path="/add"
            element={<AddRecipe />}
          />
          <Route
            path="/explore"
            element={<Explore />}
          />
          <Route
            path="/explore/:id"
            element={<Recipe />}
          />
          <Route
            path="/search"
            element={<SearchResults />}
          />
          <Route
            path="/groceryList"
            element={<GroceryListsRedirect />}
          />
          <Route
            path="/groceryList/new"
            element={<NewGroceryList />}
          />
          <Route
            path="/groceryList/:id"
            element={<GroceryList />}
          />
          <Route
            path="/savedRecipes"
            element={<SavedRecipes />}
          />
          <Route
            path="/myRecipes"
            element={<MyRecipesPage />}
          />
          <Route
            path="/myRecipes/:id"
            element={<MyRecipe />}
          />
          <Route
            path="/myRecipes/edit/:id"
            element={<EditRecipe />}
          />
          <Route
            path="/communityRecipes/:id"
            element={<CommunityRecipe />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
