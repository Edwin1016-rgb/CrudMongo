import React, { useState } from "react";
import "./FindUsers.css";

const API = process.env.REACT_APP_API;

const SearchUsers = () => {
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `${API}/search?type=${searchType}&query=${searchQuery}`
      );
      if (!res.ok) {
        throw new Error("Error en la respuesta de la red");
      }
      const data = await res.json();
      if (data && Array.isArray(data.users)) {
        setSearchResults(data.users);
      } else {
        throw new Error("La respuesta de la API no es válida");
      }
    } catch (error) {
      setError(error.message);
      setSearchResults([]);
    }
  };

  return (
    <div className="main-container">
      <div className="mainSearch">
        <h1>Search Users</h1>

        <div className="search">
          <label htmlFor="searchType">Search by:</label>
          <select className="btnSearch"
            id="searchType"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div>
          <div className="inputSearch">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
          </div>
        </div>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="container-table">
        <h2>Search Results</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchUsers;
