import React, { useEffect } from "react";

const UserDetail = ({ user }) => {
  // useEffect without dependency runs on every render
  useEffect(() => {
    console.log(`Showing details for: ${user.name}`);
  });

  // useEffect with dependency runs only when 'user' prop changes
  useEffect(() => {
    console.log(`User ${user.name} selected`);
  }, [user]);

  return (
    <div>
      <h3>User Details</h3>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
};

export default UserDetail;
