import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import PeopleIcon from "@mui/icons-material/People";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MedicationIcon from "@mui/icons-material/Medication";
import DescriptionIcon from "@mui/icons-material/Description";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axois-client";

export default function Dashboard() {
    const navigate = useNavigate();

    const { setSelectedIndex } = useStateContext();

    const [loading, setLoading] = useState(false);

    const [doctorCount, setDoctorCount] = useState();

    const [patientCount, setPatientCount] = useState();

    const [medicineCount, setMedicineCount] = useState();

    const [supplierCount, setSupplierCount] = useState();

    const [purchaseCount, setPurchaseCount] = useState();

    const [invoiceCount, setInvoiceCount] = useState();

    const onCardClick = (card) => {
        switch (card) {
            case 2:
                setSelectedIndex(localStorage.setItem("PHARMACY_LIST"), card);
                navigate("/patients");
                break;
            case 3:
                setSelectedIndex(card);
                navigate("/doctors");
                break;
            case 4:
                setSelectedIndex(card);
                navigate("/purchases");
                break;
            case 5:
                setSelectedIndex(card);
                navigate("/suppliers");
                break;
            case 6:
                setSelectedIndex(card);
                navigate("/medicines");
                break;

            case 7:
                setSelectedIndex(card);
                navigate("/invoices");
                break;
        }
    };

    useEffect(() => {
        setLoading(true);

        axiosClient.get("doctors/count").then(({ data }) => {
            setDoctorCount(data.count);
        });

        axiosClient.get("patients/count").then(({ data }) => {
            setPatientCount(data.count);
        });

        axiosClient.get("suppliers/count").then(({ data }) => {
            setSupplierCount(data.count);
        });

        axiosClient.get("medicines/count").then(({ data }) => {
            setMedicineCount(data.count);
        });

        axiosClient.get("purchases/count").then(({ data }) => {
            setPurchaseCount(data.count);
        });

        axiosClient.get("invoices/count").then(({ data }) => {
            setInvoiceCount(data.count);
            setLoading(false);
        });
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            {loading && <div className="loading">Loading...</div>}
            {!loading && (
                <div className="card-holder">
                    <div className="card" onClick={() => onCardClick(2)}>
                        <h3>Patients</h3>
                        <div className="info">
                            <div className="icon">
                                <LocalHotelIcon />
                            </div>
                            <h4>{patientCount}</h4>
                        </div>
                    </div>
                    <div className="card" onClick={() => onCardClick(3)}>
                        <h3>Doctors</h3>
                        <div className="info">
                            <div className="icon">
                                <PeopleIcon />
                            </div>
                            <h4>{doctorCount}</h4>
                        </div>
                    </div>
                    <div className="card" onClick={() => onCardClick(5)}>
                        <h3>Suppliers</h3>
                        <div className="info">
                            <div className="icon">
                                <DirectionsRunIcon />
                            </div>
                            <h4>{supplierCount}</h4>
                        </div>
                    </div>
                    <div className="card" onClick={() => onCardClick(6)}>
                        <h3>Medicines</h3>
                        <div className="info">
                            <div className="icon">
                                <MedicationIcon />
                            </div>
                            <h4>{medicineCount}</h4>
                        </div>
                    </div>
                    <div className="card" onClick={() => onCardClick(4)}>
                        <h3>Purchases</h3>
                        <div className="info">
                            <div className="icon">
                                <ShoppingCartIcon />
                            </div>
                            <h4>{purchaseCount}</h4>
                        </div>
                    </div>
                    <div className="card" onClick={() => onCardClick(7)}>
                        <h3>Invoices</h3>
                        <div className="info">
                            <div className="icon">
                                <DescriptionIcon />
                            </div>
                            <h4>{invoiceCount}</h4>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
