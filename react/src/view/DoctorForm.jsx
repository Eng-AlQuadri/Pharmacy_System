import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axois-client";

export default function DoctorForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [doctor, setDoctor] = useState({
        doctorID: null,
        name: "",
        specialization: "",
        address: "",
        phone_number: "",
    });

    const { setNotification } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/doctors/${id}`).then(({ data }) => {
                setLoading(false);
                setDoctor(data);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (doctor.doctorID) {
            setErrors(null);
            axiosClient
                .put(`/doctors/${doctor.doctorID}`, doctor)
                .then(() => {
                    setNotification("Doctor Was Updated Successfully");

                    navigate("/doctors");
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
                .post("/doctors", doctor)
                .then(() => {
                    setNotification("Doctor Was Created Successfully");

                    navigate("/doctors");
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
                        {id && <h2>Edit Doctor</h2>}
                        {!id && <h2>Add Doctor</h2>}
                        <h3>Doctor: {doctor.name}</h3>
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
                                    setDoctor({
                                        ...doctor,
                                        name: e.target.value,
                                    })
                                }
                                type="text"
                                value={doctor.name}
                            />
                        </div>
                        <div className="field">
                            <label>Specialization</label>
                            <input
                                onChange={(e) =>
                                    setDoctor({
                                        ...doctor,
                                        specialization: e.target.value,
                                    })
                                }
                                type="text"
                                value={doctor.specialization}
                            />
                        </div>
                        <div className="field">
                            <label>Address</label>
                            <input
                                onChange={(e) =>
                                    setDoctor({
                                        ...doctor,
                                        address: e.target.value,
                                    })
                                }
                                type="text"
                                value={doctor.address}
                            />
                        </div>
                        <div className="field">
                            <label>Phone Number</label>
                            <input
                                onChange={(e) =>
                                    setDoctor({
                                        ...doctor,
                                        phone_number: e.target.value,
                                    })
                                }
                                type="text"
                                value={doctor.phone_number}
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
