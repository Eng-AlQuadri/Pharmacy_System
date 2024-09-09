import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axois-client";

export default function SupplierForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [supplier, setSupplier] = useState({
        id: null,
        name: "",
        email: "",
        address: "",
        contact_number: "",
    });

    const { setNotification } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/suppliers/${id}`).then(({ data }) => {
                setLoading(false);
                setSupplier(data);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (supplier.id) {
            setErrors(null);
            axiosClient
                .put(`/suppliers/${supplier.id}`, supplier)
                .then(() => {
                    setNotification("Supplier Was Updated Successfully");

                    navigate("/suppliers");
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
                .post("/suppliers", supplier)
                .then(() => {
                    setNotification("Supplier Was Created Successfully");

                    navigate("/suppliers");
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
                        {id && <h2>Edit Supplier</h2>}
                        {!id && <h2>Add Supplier</h2>}
                        <h3>Doctor: {supplier.name}</h3>
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
                                    setSupplier({
                                        ...supplier,
                                        name: e.target.value,
                                    })
                                }
                                type="text"
                                value={supplier.name}
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input
                                onChange={(e) =>
                                    setSupplier({
                                        ...supplier,
                                        email: e.target.value,
                                    })
                                }
                                type="email"
                                value={supplier.email}
                            />
                        </div>
                        <div className="field">
                            <label>Address</label>
                            <input
                                onChange={(e) =>
                                    setSupplier({
                                        ...supplier,
                                        address: e.target.value,
                                    })
                                }
                                type="text"
                                value={supplier.address}
                            />
                        </div>
                        <div className="field">
                            <label>Contact Number</label>
                            <input
                                onChange={(e) =>
                                    setSupplier({
                                        ...supplier,
                                        contact_number: e.target.value,
                                    })
                                }
                                type="text"
                                value={supplier.contact_number}
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
