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
import AddRecipe from "./pages/AddRecipe";
// import GroceryListPage from "./pages/GroceryList";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import SignupPage from "./pages/Signup";
import RecipePage from "./pages/Recipe";
import SearchResults from "./pages/Search";
import MyGroceryListPage from "./pages/MyGroceryList";
import SavedRecipesPage from "./pages/SavedRecipes";
import GroceryListsRedirect from "./pages/GroceryListRedirect";
import NewGroceryList from "./pages/NewGroceryList";
import GroceryListPage from "./pages/GroceryListPage";
import MyRecipesPage from "./pages/MyRecipes";
import MyRecipePage from "./pages/MyRecipePage";
import EditRecipe from "./pages/EditRecipe";
import CommunityRecipe from "./pages/CommunityRecipe";

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
            element={<Home loggedIn={loggedIn}/>} 
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
            element={<AddRecipe />}
          />
          {/* <Route 
            path="/list"
            element={<GroceryListPage />}
          /> */}
          <Route 
            path="/explore"
            element={<Explore />}
          />
          <Route
            path="/explore/:id"
            element={<RecipePage />} 
          />
          <Route 
            path="/search"
            element={<SearchResults />}
          />
          {/* <Route 
            path="/myList"
            element={<MyGroceryListPage />}
          /> */}
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
            element={<GroceryListPage />}
          />
          <Route 
            path="/savedRecipes"
            element={<SavedRecipesPage />}
          />
          <Route 
            path="/myRecipes"
            element={<MyRecipesPage />}
          />
          <Route 
            path="/myRecipes/:id"
            element={<MyRecipePage />}
          />
          <Route
            path="/myRecipes/edit/:id"
            element={<EditRecipe />} 
          />
          <Route 
            path="/community-recipes/:id"
            element={<CommunityRecipe />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
