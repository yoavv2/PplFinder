import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isNewData, setIsNewData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("users") === null || isNewData) {
      console.log(`object`, localStorage.getItem("users"));
      setIsNewData(true);
      fetchUsers();
    } else {
      const tempUsersArray = new Array(JSON.parse(localStorage.getItem("users")));
      console.log(`localStorage.getItem("users")`, tempUsersArray);
      setUsers(...tempUsersArray);
    }
  }, []);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1`);
    setIsLoading(false);
    setUsers(response.data.results);
    localStorage.setItem("users", JSON.stringify(response.data.results));
  }

  return { users, isLoading, fetchUsers };
};
