import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axois-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Patients() {
    const navigate = useNavigate();

    const addPatient = () => {
        navigate("/patients/new");
    };

    const [patients, setPatients] = useState([]);

    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getPatients();
        getDoctors();
    }, []);

    const getDoctors = () => {
        axiosClient.get("/doctors").then(({ data }) => {
            setDoctors(data.data);
        });
    };

    const getPatients = () => {
        setLoading(true);
        axiosClient
            .get("/patients")
            .then(({ data }) => {
                setLoading(false);
                setPatients(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onEdit = (p) => {
        navigate(`/patients/${p.id}`);
    };

    const onDelete = (p) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient.delete(`/patients/${p.id}`).then(() => {
            setNotification("Deleted Successfully");
            getPatients();
        });
    };

    const findDoctorName = (doctorID) => {
        const doctor = doctors.find((doc) => doc.doctorID == doctorID);
        return doctor ? doctor.name : "Unknown Doctor";
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Patients</h2>
                <button className="add-user" onClick={addPatient}>
                    Add New Patient
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Doctor Name</th>
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
                            {patients.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.address}</td>
                                    <td>{p.phone_number}</td>
                                    <td>{findDoctorName(p.doctor_ID)}</td>
                                    <td className="options">
                                        <button
                                            className="edit"
                                            onClick={() => onEdit(p)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete"
                                            onClick={() => onDelete(p)}
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
