import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axois-client";

export default function PatientsForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [doctors, setDoctors] = useState([]);

    const [patient, setPatient] = useState({
        id: null,
        name: "",
        address: "",
        phone_number: "",
        doctor_ID: null,
    });

    const { setNotification } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/patients/${id}`).then(({ data }) => {
                setLoading(false);
                setPatient(data);
            });
        }, []);
    }

    useEffect(() => {
        axiosClient.get("/doctors").then(({ data }) => {
            setDoctors(data.data);
        });
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        if (patient.id) {
            setErrors(null);
            axiosClient
                .put(`/patients/${patient.id}`, patient)
                .then(() => {
                    setNotification("Patient Was Updated Successfully");

                    navigate("/patients");
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
                .post("/patients", patient)
                .then(() => {
                    setNotification("Patient Was Created Successfully");

                    navigate("/patients");
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
                        {id && <h2>Edit Patient</h2>}
                        {!id && <h2>Add Patient</h2>}
                        <h3>Patient: {patient.name}</h3>
                        <div className="serrors show">
                            {errors &&
                                Object.keys(errors).map((key) => (
                                    <h3 key={key}>{errors[key][0]}</h3>
                                ))}
                        </div>

                        <div className="field">
                            <label>Name</label>
                            <input
                                onChange={(e) =>
                                    setPatient({
                                        ...patient,
                                        name: e.target.value,
                                    })
                                }
                                type="text"
                                value={patient.name}
                            />
                        </div>
                        <div className="field">
                            <label>Address</label>
                            <input
                                onChange={(e) =>
                                    setPatient({
                                        ...patient,
                                        address: e.target.value,
                                    })
                                }
                                type="text"
                                value={patient.address}
                            />
                        </div>
                        <div className="field">
                            <label>Phone Number</label>
                            <input
                                onChange={(e) =>
                                    setPatient({
                                        ...patient,
                                        phone_number: e.target.value,
                                    })
                                }
                                type="text"
                                value={patient.phone_number}
                            />
                        </div>
                        <div className="field">
                            <label>Doctor Name</label>
                            <select
                                value={patient.doctor_ID}
                                onChange={(e) =>
                                    setPatient({
                                        ...patient,
                                        doctor_ID: e.target.value,
                                    })
                                }
                            >
                                <option value="">Select Doctor</option>
                                {doctors.map((doctor) => (
                                    <option
                                        key={doctor.doctorID}
                                        value={doctor.doctorID}
                                    >
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
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
