import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axois-client";

export default function MedicineForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [medicine, setmedicine] = useState({
        id: null,
        name: "",
        packing: "",
        exp_date: "",
        in_stock: "",
    });

    const { setNotification } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/medicines/${id}`).then(({ data }) => {
                setLoading(false);
                setmedicine(data);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (medicine.id) {
            setErrors(null);
            axiosClient
                .put(`/medicines/${medicine.id}`, medicine)
                .then(() => {
                    setNotification("Medicine Was Updated Successfully");

                    navigate("/medicines");
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
                .post("/medicines", medicine)
                .then(() => {
                    setNotification("Medicine Was Created Successfully");

                    navigate("/medicines");
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
                        {id && <h2>Edit Medicine</h2>}
                        {!id && <h2>Add Medicine</h2>}
                        <h3>Medicine: {medicine.name}</h3>
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
                                    setmedicine({
                                        ...medicine,
                                        name: e.target.value,
                                    })
                                }
                                type="text"
                                value={medicine.name}
                            />
                        </div>
                        <div className="field">
                            <label>Packing</label>
                            <input
                                onChange={(e) =>
                                    setmedicine({
                                        ...medicine,
                                        packing: e.target.value,
                                    })
                                }
                                type="text"
                                value={medicine.packing}
                            />
                        </div>
                        <div className="field">
                            <label>Exp.Date</label>
                            <input
                                onChange={(e) =>
                                    setmedicine({
                                        ...medicine,
                                        exp_date: e.target.value,
                                    })
                                }
                                type="text"
                                value={medicine.exp_date}
                            />
                        </div>
                        <div className="field">
                            <label>In Stock</label>
                            <input
                                onChange={(e) =>
                                    setmedicine({
                                        ...medicine,
                                        in_stock: e.target.value,
                                    })
                                }
                                type="text"
                                value={medicine.in_stock}
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
