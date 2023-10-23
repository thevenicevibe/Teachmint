import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import "./App.css"

function UserDirectory() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const usersWithPosts = response.data.map(async (user) => {
          const postsResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
          );
          user.posts = postsResponse.data;
          return user;
        });

        Promise.all(usersWithPosts).then((usersWithPostsData) => {
          setUsers(usersWithPostsData);
        });
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
	<div className="container">
	<h1>Directory</h1>
	<ul className='user-list'>
	  {users.map((user) => (
		<li key={user.id}>
		  <Link to={`/user/${user.id}`}>
			{user.name}
			<span className="user-posts">Total Posts: {user.posts.length}</span>
		  </Link>
		</li>
	  ))}
	</ul>
  </div>
  );
}

export default UserDirectory;
