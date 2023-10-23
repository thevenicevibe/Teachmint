import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Clock from "./Clock"

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [clockData, setClockData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    axios
      .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });
  }, [userId]);


  useEffect(() => {
    if (selectedCountry) {
        axios
      .get(`http://worldtimeapi.org/api/timezone/${selectedCountry}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          const countries = response.data;
          setClockData(countries);
        } else {
          setClockData([]);
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching current time:", error);
      });
    }
  }, [selectedCountry]);

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <Link to="/">Back</Link>

      
      <div className="country-selector">
        <h2>Select a Country</h2>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select a Country</option>
          {clockData.length && clockData.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && <Clock selectedCountry={selectedCountry} />}

      <div>
        
      </div>
    </div>
  );
}

export default UserProfile;
