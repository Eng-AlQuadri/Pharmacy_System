import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axois-client";

export default function InvoicesForm() {
    const [errors, setErrors] = useState();

    const [patients, setPatient] = useState([]);

    const [medicines, setMedicines] = useState([]);

    const [loading, setLoading] = useState(false);

    const [invoice, setInvoice] = useState({
        id: null,
        patient_id: null,
        medicine_id: null,
        date: "",
        quantity: "",
    });

    useEffect(() => {
        getPatients();
        getMedicines();
    }, []);

    const getPatients = () => {
        setLoading(true);
        axiosClient
            .get("/patients")
            .then(({ data }) => {
                setLoading(false);
                setPatient(data.data);
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

    const { setNotification } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/purchases/${id}`).then(({ data }) => {
                setLoading(false);
                setInvoice(data);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (invoice.id) {
            setErrors(null);
            axiosClient
                .put(`/invoices/${invoice.id}`, invoice)
                .then(() => {
                    setNotification("Invoice Was Updated Successfully");

                    navigate("/invoices");
                })
                .catch((error) => {
                    const response = error.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            setErrors(null);
            axiosClient
                .post("/invoices", invoice)
                .then(() => {
                    setNotification("Invoice Was Created Successfully");

                    navigate("/invoices");
                })
                .catch((error) => {
                    const response = error.response;

                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {loading && <div className="loading">Loading...</div>}

                {!loading && (
                    <form className="signup" onSubmit={onSubmit}>
                        {id && <h2>Edit Invoice</h2>}
                        {!id && <h2>Add Invoice</h2>}
                        <h3>Invoice: {invoice.id}</h3>
                        <div className="serrors show">
                            {errors &&
                                Object.keys(errors).map((key) => (
                                    <h3 key={key}>{errors[key][0]}</h3>
                                ))}
                        </div>

                        <div className="field">
                            <label>Date</label>
                            <input
                                onChange={(e) =>
                                    setInvoice({
                                        ...invoice,
                                        date: e.target.value,
                                    })
                                }
                                type="text"
                                value={invoice.date}
                            />
                        </div>
                        <div className="field">
                            <label>Patient Name</label>
                            <select
                                value={invoice.patient_id}
                                onChange={(e) =>
                                    setInvoice({
                                        ...invoice,
                                        patient_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">Select Patinet</option>
                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label>Medicine Name</label>
                            <select
                                value={invoice.medicine_id}
                                onChange={(e) =>
                                    setInvoice({
                                        ...invoice,
                                        medicine_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">Select Medicine</option>
                                {medicines.map((medicine) => (
                                    <option
                                        key={medicine.id}
                                        value={medicine.id}
                                    >
                                        {medicine.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label>Quantity</label>
                            <input
                                onChange={(e) =>
                                    setInvoice({
                                        ...invoice,
                                        quantity: e.target.value,
                                    })
                                }
                                type="text"
                                value={invoice.quantity}
                            />
                        </div>
                        <input
                            type="submit"
                            value="Submit"
                            id="submit-btn"
                            name="signup"
                        />
                    </form>
                )}
            </div>
        </div>
    );
}
