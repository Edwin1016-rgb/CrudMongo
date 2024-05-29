import React, {useState, useEffect} from "react";
import "./Users.css";

const API = process.env.REACT_APP_API;

const Users = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");
    const [users, setUsers] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res;
        if (!editing) {
            res = await fetch(`${API}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
        } else {
            res = await fetch(`${API}/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });
            setEditing(false);
            setId("");
        }
        const data = await res.json();
        console.log(data);
        await getUsers();
        setName("");
        setEmail("");
        setPassword("");
    };

    const getUsers = async () => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data.users);
    };

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = async (id) => {
        const userResponse = window.confirm("Are you sure you want to delete it?");
        if (userResponse) {
            const res = await fetch(`${API}/users/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            console.log(data);
            getUsers();
        }
    };

    const editUser = async (id) => {
        const res = await fetch(`${API}/users/${id}`);
        const data = await res.json();
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
        setEditing(true);
        setId(id);
    };

    const handleClearSearch = () => {
        setSearchName("");
        setSearchEmail("");
        getUsers();
    }

    const handleSearch = async () => {
        if (!searchName && !searchEmail) return getUsers();

        try {
            const query = {};
            if (searchName) query.name = searchName;
            if (searchEmail) query.email = searchEmail;

            const queryString = new URLSearchParams(query).toString();
            const res = await fetch(`${API}/search?${queryString}`);
            if (!res.ok) {
                throw new Error("Error en la respuesta de la red");
            }
            const data = await res.json();
            if (data && Array.isArray(data.users)) {
                setSearchResults(data.users);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
            setSearchResults([]);
        }
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Name"
                            autoFocus
                        />

                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            placeholder="Email"
                        />

                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        {editing ? "Update" : "Create"}
                    </button>
                </form>
            </div>

            <div className="col-md-8">
                {/* Barra de Búsqueda */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                    }}
                    className="form-inline mb-3"
                >
                    <input
                        type="text"
                        className="form-control mr-2"
                        placeholder="Search by Name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control mr-2"
                        placeholder="Search by Email"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                        Search
                    </button>
                    <button type="button" onClick={handleClearSearch} className="btn btn-primary">
                        Clear Search
                    </button>
                </form>

                {error && <p style={{color: "red"}}>{error}</p>}

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Operations</th>
                    </tr>
                    </thead>
                    <tbody>
                    {(searchName || searchEmail ? searchResults : users).map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <button
                                    className="btn btn-secondary btn-sm btn-block"
                                    onClick={() => editUser(user._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm btn-block"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
