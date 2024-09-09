import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axois-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Supplier() {
    const navigate = useNavigate();

    const addSupplier = () => {
        navigate("/suppliers/new");
    };

    const [supplier, setSupplier] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getSuppliers();
    }, []);

    const getSuppliers = () => {
        setLoading(true);
        axiosClient
            .get("/suppliers")
            .then(({ data }) => {
                setLoading(false);
                setSupplier(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (s) => {
        navigate(`/suppliers/${s.id}`);
    };

    const onDelete = (s) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient.delete(`/suppliers/${s.id}`).then(() => {
            setNotification("Deleted Successfully");
            getSuppliers();
        });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Suppliers</h2>
                <button className="add-user" onClick={addSupplier}>
                    Add New Supplier
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Options</th>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="6" className="loading">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {supplier.map((s) => (
                                <tr key={s.id}>
                                    <td>{s.id}</td>
                                    <td>{s.name}</td>
                                    <td>{s.email}</td>
                                    <td>{s.address}</td>
                                    <td>{s.contact_number}</td>
                                    <td className="options">
                                        <button
                                            className="edit"
                                            onClick={() => onEdit(s)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => onDelete(s)}
                                        >
                                            Delete
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
