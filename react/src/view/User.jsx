import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axois-client";
// import { useStateContext } from "../contexts/ContextProvider";

export default function User() {
    const navigate = useNavigate();

    const [user, setUser] = useState([]);

    const [loading, setLoading] = useState(false);

    // const { setNotification } = useStateContext();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUser(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (s) => {
        navigate(`/users/${s.id}`);
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Your Account</h2>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Options</th>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="4" className="loading">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {user.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td className="options">
                                        <button
                                            className="edit"
                                            onClick={() => onEdit(u)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
