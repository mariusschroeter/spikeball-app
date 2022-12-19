import React from "react";

import UserHeader from "./UserHeader";

const UserPage = ({ loggedInUser, authUser, games, users }) => {
  return (
    <div>
      <UserHeader users={users} authUser={authUser} games={games} />
    </div>
  );
};

export default UserPage;
