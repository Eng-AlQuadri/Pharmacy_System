import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axois-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Purchase() {
    const navigate = useNavigate();

    const addPurchase = () => {
        navigate("/purchases/new");
    };

    const [purchases, setPurchases] = useState([]);

    const [medicines, setMedicines] = useState([]);

    const [suppliers, setSuppliers] = useState([]);

    const [loading, setLoading] = useState(false);

    const { setNotification } = useStateContext();

    useEffect(() => {
        getPurchases();
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

    const getPurchases = () => {
        setLoading(true);
        axiosClient
            .get("/purchases")
            .then(({ data }) => {
                setLoading(false);
                setPurchases(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const findSupplierName = (id) => {
        const supplierName = suppliers.find((supplier) => supplier.id === id);
        return supplierName ? supplierName.name : "Unknown Supplier";
    };

    const findMedicineName = (id) => {
        const medicineName = medicines.find((medicine) => medicine.id === id);
        return medicineName ? medicineName.name : "Unknown Medicine";
    };

    const onEdit = (p) => {
        navigate(`/purchases/${p.id}`);
    };

    const onDelete = (p) => {
        if (!window.confirm("Are You Sure?")) return;

        axiosClient.delete(`/purchases/${p.id}`).then(() => {
            setNotification("Deleted Successfully");
            getPurchases();
        });
    };

    return (
        <div className="doctors">
            <div className="doc-head">
                <h2>Manage Purchases</h2>
                <button className="add-user" onClick={addPurchase}>
                    Add New Purchase
                </button>
            </div>
            <div className="table">
                <table className="animated fadeInDown">
                    <thead>
                        <th>ID</th>
                        <th>Voucher_Number</th>
                        <th>Supplier_Name</th>
                        <th>Medicine_Name</th>
                        <th>Status</th>
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
                            {purchases.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.voucher_number}</td>
                                    <td>{findSupplierName(p.supplier_id)}</td>
                                    <td>{findMedicineName(p.medicine_id)}</td>
                                    <td>{p.status}</td>
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
