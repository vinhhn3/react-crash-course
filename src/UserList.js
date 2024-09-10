import React, { useState } from "react";
import UserDetail from "./UserDetail";

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setSelectedUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>

      {selectedUser && <UserDetail user={selectedUser} />}
    </div>
  );
};

export default UserList;
