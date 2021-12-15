import React, { createContext, useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Favorites } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";
import { usePeopleFetch } from "./hooks";
export const UserContext = createContext();

const AppRouter = () => {
  const { users, isLoading } = usePeopleFetch();
  const [nationalities, setNationalities] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const handleNationalities = (nat) => {
    if (nationalities.includes(nat)) {
      let countries = nationalities.filter((state) => state !== nat);
      setNationalities(countries);
    } else {
      setNationalities([nat, ...nationalities]);
    }
  };

  const addFavorite = (username) => {
    setFavorites((prev) => [...prev, username]);
  };

  const removeFavorite = (username) => {
    setFavorites((prev) => prev.filter((person) => person != username));
  };

  const isFavorite = (username) => {
    return favorites.includes(username);
  };
  useEffect(() => {
    const tempUsersArray = new Array(JSON.parse(localStorage.getItem("favorites")));
    setFavorites(...tempUsersArray);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <UserContext.Provider
      value={{
        nationalities,
        setNationalities,
        handleNationalities,
        favorites,
        setFavorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        users,
        isLoading,
      }}
    >
      <ThemeProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/" component={Home} />
          </Switch>
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
};

export default AppRouter;
