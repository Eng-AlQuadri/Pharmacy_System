import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axois-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Medicines() {
    const navigate = useNavigate();

    const addMedicine = () => {
        navigate("/medicines/new");
    };

    const [medicines, setMedicines] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getMedicines();
    }, []);

    const getMedicines = () => {
        setLoading(true);
        axiosClient
            .get("/medicines")
            .then(({ data }) => {
                setLoading(false);
                setMedicines(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (m) => {
        navigate(`/medicines/${m.id}`);
    };

    const onDelete = (m) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient.delete(`/medicines/${m.id}`).then(() => {
            setNotification("Deleted Successfully");
            getMedicines();
        });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Medicines</h2>
                <button className="add-user" onClick={addMedicine}>
                    Add New Medicine
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Packing</th>
                        <th>Exp.Date</th>
                        <th>In Stock</th>
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
                            {medicines.map((m) => (
                                <tr key={m.id}>
                                    <td>{m.id}</td>
                                    <td>{m.name}</td>
                                    <td>{m.packing}</td>
                                    <td>{m.exp_date}</td>
                                    <td>{m.in_stock}</td>
                                    <td className="options">
                                        <button
                                            className="edit"
                                            onClick={() => onEdit(m)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => onDelete(m)}
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
