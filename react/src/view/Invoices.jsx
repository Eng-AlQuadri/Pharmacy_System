import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axois-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Invoices() {
    const navigate = useNavigate();

    const addInvoice = () => {
        navigate("/invoices/new");
    };

    const [invoices, setInvoices] = useState([]);

    const [loading, setLoading] = useState(false);

    const [medicines, setMedicines] = useState([]);

    const [patients, setPatients] = useState([]);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getInvoices();
        getPatients();
        getMedicines();
    }, []);

    const getInvoices = () => {
        setLoading(true);
        axiosClient
            .get("/invoices")
            .then(({ data }) => {
                setLoading(false);
                setInvoices(data.data);
            })
            .catch(() => {
                setLoading(false);
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

    const onDelete = (i) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient.delete(`/invoices/${i.id}`).then(() => {
            setNotification("Deleted Successfully");
            getInvoices();
        });
    };

    const findPatientName = (id) => {
        const patientName = patients.find((patient) => patient.id === id);
        return patientName ? patientName.name : "Unknown Patient";
    };

    const findMedicineName = (id) => {
        const medicineName = medicines.find((medicine) => medicine.id === id);
        return medicineName ? medicineName.name : "Unknown Medicine";
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Invoices</h2>
                <button className="add-user" onClick={addInvoice}>
                    Add New Invoice
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Patient Name</th>
                        <th>Medicine Name</th>
                        <th>Date</th>
                        <th>Quantity</th>
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
                            {invoices.map((i) => (
                                <tr key={i.id}>
                                    <td>{i.id}</td>
                                    <td>{findPatientName(i.patient_id)}</td>
                                    <td>{findMedicineName(i.medicine_id)}</td>
                                    <td>{i.date}</td>
                                    <td>{i.quantity}</td>
                                    <td className="options">
                                        <button
                                            className="delete"
                                            onClick={() => onDelete(i)}
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
