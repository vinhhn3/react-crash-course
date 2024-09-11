// src/App.js
import React, { useEffect, useState } from "react";
import "./App.css";
import UserList from "./UserList";

const fetchUsers = async () => {
  // Simulating API fetch with a promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Doe", email: "jane@example.com" },
      ]);
    }, 1000);
  });
};

const App = () => {
  const [users, setUsers] = useState([]); // State to hold users
  const [loading, setLoading] = useState(true); // State for loading status
  const [newUserName, setNewUserName] = useState(""); // State for input field (new task)

  // Run on every render
  useEffect(() => {
    console.log("Run on every Render!");
  });

  // Fetch users when component mounts
  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchUsers();
      setUsers(userData);
      setLoading(false);
    };
    console.log("Run getUsers only once");
    getUsers();
  }, []);

  // useEffect with a dependency (runs when 'users' changes)
  useEffect(() => {
    if (users.length > 0) {
      console.log("Users updated!", users);
    }
  }, [users]);

  // Function to handle adding a new user/task
  const addUser = () => {
    if (newUserName.trim() === "") return; // Ignore empty names

    const newUser = {
      id: users.length + 1, // Simple unique id based on length
      name: newUserName,
      email: `${newUserName.toLowerCase().split(" ").join("")}@example.com`,
    };

    // Update the state with the new user
    setUsers([...users, newUser]);
    setNewUserName(""); // Clear the input field after adding
  };

  return (
    <div className="App">
      <h1>User Directory</h1>

      {/* Input for adding new task/user */}
      <div>
        <input
          type="text"
          placeholder="Add a new task/user..."
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)} // Update state on input change
        />
        <button onClick={addUser}>Add Task/User</button>
      </div>

      {loading ? <p>Loading users...</p> : <UserList users={users} />}
    </div>
  );
};

export default App;
