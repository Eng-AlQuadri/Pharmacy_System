import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axois-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Doctors() {
    const navigate = useNavigate();

    const addDoctor = () => {
        navigate("/doctors/new");
    };

    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getDoctors();
    }, []);

    const getDoctors = () => {
        setLoading(true);
        axiosClient
            .get("/doctors")
            .then(({ data }) => {
                setLoading(false);
                setDoctors(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (d) => {
        navigate(`/doctors/${d.doctorID}`);
    };

    const onDelete = (d) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient.delete(`/doctors/${d.doctorID}`).then(() => {
            setNotification("Deleted Successfully");
            getDoctors();
        });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Doctors</h2>
                <button className="add-user" onClick={addDoctor}>
                    Add New Doctor
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Address</th>
                        <th>Phone Number</th>
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
                            {doctors.map((d) => (
                                <tr key={d.doctorID}>
                                    <td>{d.doctorID}</td>
                                    <td>{d.name}</td>
                                    <td>{d.specialization}</td>
                                    <td>{d.address}</td>
                                    <td>{d.phone_number}</td>
                                    <td className="options">
                                        <button
                                            className="edit"
                                            onClick={() => onEdit(d)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => onDelete(d)}
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
