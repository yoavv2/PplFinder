import React, { useEffect, useState } from "react";
import { usePeopleFetch } from "hooks";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";

import * as S from "./style";

const UserList = ({ users, isLoading, fetchUsers }) => {
  const [checked, setChecked] = useState(false);
  const [nationalitys, setNationalitys] = useState([]);
  const [hoveredUserId, setHoveredUserId] = useState();

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleChange = (nat) => {
    setNationalitys([nat, ...nationalitys]);

    if (nationalitys.includes(nat)) {
      let countries = nationalitys.filter((state) => state != nat);
      setNationalitys(countries);
    }
  };

  useEffect(() => {
    //  debounce
    let timeout = setTimeout(async () => {
      clearTimeout(timeout);
      await fetchUsers(nationalitys.join());
    }, 700);
  }, [nationalitys]);

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleChange} />
        <CheckBox value="AU" label="Australia" onChange={handleChange} />
        <CheckBox value="CA" label="Canada" onChange={handleChange} />
        <CheckBox value="DE" label="Germany" onChange={handleChange} />
        <CheckBox value="DK" label="Denmark" onChange={handleChange} />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={index === hoveredUserId}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
