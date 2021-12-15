import React, { useEffect, useState, useContext } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { UserContext } from "AppRouter";

const UserList = ({ users, isLoading }) => {
  const { handleNationalities, addFavorite, removeFavorite, isFavorite } =
    useContext(UserContext);
  const [hoveredUserId, setHoveredUserId] = useState();
  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  return (
    <S.UserList>
      <S.Filters>
        <CheckBox value="BR" label="Brazil" onChange={handleNationalities} />
        <CheckBox value="AU" label="Australia" onChange={handleNationalities} />
        <CheckBox value="CA" label="Canada" onChange={handleNationalities} />
        <CheckBox value="DE" label="Germany" onChange={handleNationalities} />
        <CheckBox value="FR" label="France" onChange={handleNationalities} />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture?.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name?.title} {user?.name?.first} {user?.name?.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location?.street?.number} {user?.location?.street?.name}
                </Text>
                <Text size="14px">
                  {user?.location?.city} {user?.location?.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper
                isVisible={index === hoveredUserId || isFavorite(user?.login?.username)}
                onClick={() =>
                  isFavorite(user?.login?.username)
                    ? removeFavorite(user?.login?.username)
                    : addFavorite(user?.login?.username)
                }
              >
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
