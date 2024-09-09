import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axois-client";

export default function PurchaseForm() {
    const [errors, setErrors] = useState();

    const [suppliers, setSuppliers] = useState([]);

    const [medicines, setMedicines] = useState([]);

    const [loading, setLoading] = useState(false);

    const [purchase, setPurchase] = useState({
        id: null,
        voucher_number: "",
        supplier_medicines: null,
        status: "",
    });

    useEffect(() => {
        getSuppliers();
        getMedicines();
    }, []);

    const getSuppliers = () => {
        setLoading(true);
        axiosClient
            .get("/suppliers")
            .then(({ data }) => {
                setLoading(false);
                setSuppliers(data.data);
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
                setPurchase(data);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (purchase.id) {
            setErrors(null);
            axiosClient
                .put(`/purchases/${purchase.id}`, purchase)
                .then(() => {
                    setNotification("Purchase Was Updated Successfully");

                    navigate("/purchases");
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
                .post("/purchases", purchase)
                .then(() => {
                    setNotification("Purchase Was Created Successfully");

                    navigate("/purchases");
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
                        {id && <h2>Edit Purchase</h2>}
                        {!id && <h2>Add Purchase</h2>}
                        <h3>Purchase: {purchase.name}</h3>
                        <div className="serrors show">
                            {errors &&
                                Object.keys(errors).map((key) => (
                                    <h3 key={key}>{errors[key][0]}</h3>
                                ))}
                        </div>

                        <div className="field">
                            <label>Voucher_Number</label>
                            <input
                                onChange={(e) =>
                                    setPurchase({
                                        ...purchase,
                                        voucher_number: e.target.value,
                                    })
                                }
                                type="text"
                                value={purchase.voucher_number}
                            />
                        </div>
                        <div className="field">
                            <label>Supplier Name</label>
                            <select
                                value={purchase.supplier_id}
                                onChange={(e) =>
                                    setPurchase({
                                        ...purchase,
                                        supplier_id: e.target.value,
                                    })
                                }
                            >
                                <option value="">Select Supplier</option>
                                {suppliers.map((supplier) => (
                                    <option
                                        key={supplier.id}
                                        value={supplier.id}
                                    >
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label>Medicine Name</label>
                            <select
                                value={purchase.medicine_id}
                                onChange={(e) =>
                                    setPurchase({
                                        ...purchase,
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
                            <label>Status</label>
                            <input
                                onChange={(e) =>
                                    setPurchase({
                                        ...purchase,
                                        status: e.target.value,
                                    })
                                }
                                type="text"
                                value={purchase.status}
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
