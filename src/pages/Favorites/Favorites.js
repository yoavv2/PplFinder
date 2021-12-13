import React, { useState, useContext, useEffect } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import { UserContext } from "AppRouter";

const Favorites = () => {
  const { nationalities,setNationalities, favorites, users } = useContext(UserContext);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filteredByNationality, setFilteredByNationality] = useState(filteredUsers);
 
 
  useEffect(()=>{
    setNationalities([]);
  },[])


  useEffect(() => {
 
    setFilteredUsers(users?.filter((user) => {
      return favorites.includes(user.login.username);
    }));
  }, [users, favorites]);

  useEffect(() => {
   
    setFilteredByNationality(filteredUsers?.filter((user) => {
      return nationalities.includes(user.nat);
    }));
  }, [nationalities]);

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <UserList users={nationalities.length ? filteredByNationality : filteredUsers} />
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
