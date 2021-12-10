import { useState, useEffect } from "react";
import axios from "axios";
import { nativeTouchData } from "react-dom/cjs/react-dom-test-utils.production.min";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers(nativeTouchData);
  }, []);

  async function fetchUsers(nat) {
    console.log(`fetch`, nat);

    setIsLoading(true);
    const response = await axios.get(
      `https://randomuser.me/api/?results=25&page=1&nat=${nat}`
    );
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
