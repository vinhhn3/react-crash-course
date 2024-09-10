Let's create a simple React project that covers all the mentioned concepts: **state**, **props**, **useEffect** (with and without dependencies), **async/await**, **promises**, and **returning a promise**.

We'll build a basic app that fetches data from an API (simulated) and displays it, using state and props to manage and pass data between components.

### Step 1: Setup React Project

Run this command to create a new React project:

```bash
npx create-react-app react-crash-course
cd react-crash-course
npm start
```

### Step 2: Create the Component Structure

Our app will consist of three components:

- **App** (main component)
- **UserList** (displays a list of users)
- **UserDetail** (displays details of a specific user)

We'll simulate fetching data using `async/await`, promises, and the `useEffect` hook.

### Step 3: Code Implementation

#### **1. `App.js` (Main Component)**

Here, we manage the state for the user list, handle data fetching using async/await, and demonstrate `useEffect` with and without dependencies.

```jsx
// src/App.js
import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import "./App.css";

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

  // useEffect with no dependency to run on every render (but bad practice)
  useEffect(() => {
    console.log("Component re-rendered");
  });

  // useEffect with empty dependency array (runs only on component mount)
  useEffect(() => {
    console.log("Component mounted");

    // Fetch users asynchronously
    const getUsers = async () => {
      try {
        const userData = await fetchUsers(); // Async/Await fetching
        setUsers(userData); // Set the users in state
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getUsers();
  }, []); // Empty array ensures it only runs once, when the component mounts

  // useEffect with a dependency (runs when 'users' changes)
  useEffect(() => {
    if (users.length > 0) {
      console.log("Users updated!", users);
    }
  }, [users]);

  return (
    <div className="App">
      <h1>User Directory</h1>
      {loading ? <p>Loading users...</p> : <UserList users={users} />}
    </div>
  );
};

export default App;
```

#### Explanation of Concepts in `App.js`:

- **State** (`useState`): We have two states, `users` (for holding the user list) and `loading` (to show loading status).
- **useEffect**:
  - One `useEffect` runs every time the component re-renders (which is usually avoided).
  - Another `useEffect` runs once when the component mounts (because of the empty dependency array `[]`).
  - A third `useEffect` runs whenever the `users` state updates.
- **Async/Await**: We fetch users from a simulated API using async/await.
- **Promise**: The `fetchUsers` function returns a promise that resolves after 1 second.

#### **2. `UserList.js` (List Component)**

This component receives the list of users as **props** and renders each user. We'll pass data using props and handle simple logic.

```jsx
// src/UserList.js
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
```

#### Explanation of Concepts in `UserList.js`:

- **Props**: We pass the list of users from `App.js` to `UserList.js` as props. `props.users` is used to render each user.
- **State**: We manage the currently selected user using state (`useState`).
- **Event Handling**: We update the state when a user is clicked by using the `onClick` event.

#### **3. `UserDetail.js` (Detail Component)**

This component receives a user as a **prop** and displays their details.

```jsx
// src/UserDetail.js
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
```

#### Explanation of Concepts in `UserDetail.js`:

- **Props**: The `user` prop is passed from `UserList.js` to `UserDetail.js`.
- **useEffect**:
  - The first `useEffect` logs details whenever the component re-renders (this will happen if the parent re-renders).
  - The second `useEffect` runs only when the `user` prop changes, useful for logging or triggering side effects.

---

### Step 4: Modify to Add Tasks

We'll update the `App.js` component to include an input field for adding tasks and a button to trigger the addition. The user will be able to add tasks to the list, which will update the `users` state.

`App.js`

```js
// src/App.js
import React, { useState, useEffect } from "react";
import UserList from "./UserList";
import "./App.css";

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

  // Fetch users when component mounts
  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchUsers();
      setUsers(userData);
      setLoading(false);
    };
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
```

### Final Result

- You can now run `npm start` and see your app in action.
- You have learned how to:
  - Use state and props to manage and pass data.
  - Fetch data using async/await and promises.
  - Use the `useEffect` hook with and without dependencies.

This crash course gives you a hands-on introduction to React, covering the most essential concepts!
