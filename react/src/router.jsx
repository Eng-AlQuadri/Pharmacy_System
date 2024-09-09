import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "./view/NotFound";
import GuestLayout from "./components/GuestLayout";
import Login from "./view/Login";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./view/Dashboard";
import Doctors from "./view/Doctors";
import DoctorForm from "./view/DoctorForm";
// import Signup from "./view/Signup";
import Patients from "./view/Patients";
import PatientsForm from "./view/PatientsForm";
import Supplier from "./view/Supplier";
import SupplierForm from "./view/SupplierForm";
import Medicines from "./view/Medicines";
import MedicinesForm from "./view/MedicinesForm";
import Purchase from "./view/Purchase";
import PurchaseForm from "./view/PurchaseForm";
import PurchaseEditForm from "./view/PurchaseEditForm";
import Invoices from "./view/Invoices";
import InvoicesForm from "./view/InvoicesForm";
import User from "./view/User";
import UserForm from "./view/UserForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/dashboard" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/doctors",
                element: <Doctors />,
            },
            {
                path: "/doctors/new",
                element: <DoctorForm key="doctorCreate" />,
            },
            {
                path: "doctors/:id",
                element: <DoctorForm key="doctorUpdate" />,
            },
            {
                path: "/patients",
                element: <Patients />,
            },
            {
                path: "/patients/new",
                element: <PatientsForm key="patientCreate" />,
            },
            {
                path: "/patients/:id",
                element: <PatientsForm key="patientUpdate" />,
            },
            {
                path: "/suppliers",
                element: <Supplier />,
            },
            {
                path: "/suppliers/new",
                element: <SupplierForm key="supplierCreate" />,
            },
            {
                path: "/suppliers/:id",
                element: <SupplierForm key="supplierUpdate" />,
            },
            {
                path: "/medicines",
                element: <Medicines />,
            },
            {
                path: "/medicines/new",
                element: <MedicinesForm key="medicineCreate" />,
            },
            {
                path: "/medicines/:id",
                element: <MedicinesForm key="medicineUpdate" />,
            },
            {
                path: "/purchases",
                element: <Purchase />,
            },
            {
                path: "/purchases/new",
                element: <PurchaseForm key="purchaseCreate" />,
            },
            {
                path: "/purchases/:id",
                element: <PurchaseEditForm key="purchaseUpdate" />,
            },
            {
                path: "/invoices",
                element: <Invoices />,
            },
            {
                path: "/invoices/new",
                element: <InvoicesForm key="invoiceCreate" />,
            },
            {
                path: "/users",
                element: <User />,
            },
            {
                path: "/users/:id",
                element: <UserForm />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            // {
            //     path: "/signup",
            //     element: <Signup />,
            // },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
