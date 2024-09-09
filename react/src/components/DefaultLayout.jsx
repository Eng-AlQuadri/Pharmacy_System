import { Link, Navigate, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import HomeIcon from "@mui/icons-material/Home";
import LocalHotelIcon from "@mui/icons-material/LocalHotel";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import MedicationIcon from "@mui/icons-material/Medication";
import DescriptionIcon from "@mui/icons-material/Description";
// import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axois-client";

export default function DefaultLayout() {
    const { selectedIndex, setSelectedIndex, notification, setToken, setUser } =
        useStateContext();

    const [isClose, setIsClose] = useState(
        localStorage.getItem("IS_CLOSE") === "true"
    );

    const [isOpen, setIsOpen] = useState(
        localStorage.getItem("IS_OPEN") === "true"
    );

    const navClick = (index) => {
        // For Logout
        if (index == 10) {
            axiosClient.post("/logout").then(() => {
                setToken("");
                setUser(null);
            });
        }
        setSelectedIndex(index);
        localStorage.setItem("PHARMACY_LIST", index);
    };

    const sidebar = () => {
        if (isClose) {
            setIsClose(false);
            setIsOpen(false);
            localStorage.setItem("IS_CLOSE", "false");
            localStorage.setItem("IS_OPEN", "false");
        } else {
            setIsClose(true);
            setIsOpen(true);
            localStorage.setItem("IS_CLOSE", "true");
            localStorage.setItem("IS_OPEN", "true");
        }
    };

    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="defaultLayout">
            <div className="upperBar">
                <div className="holder">
                    <span className="icon">
                        <MenuIcon onClick={sidebar} />
                    </span>
                    <span className="settingsHolder">
                        <h4>Adminstrator</h4>
                        <div className="logoutIcon">
                            <LogoutIcon onClick={() => navClick(10)} />
                        </div>
                        <ul>
                            <li>Account Settings</li>
                            <li>Logout</li>
                        </ul>
                    </span>
                </div>
            </div>
            <div className={isClose ? "aside closed" : "aside"}>
                <ul>
                    <li>
                        <span className="icon">
                            <VaccinesIcon />
                        </span>
                        <span className="title">Pharmacy System</span>
                    </li>
                    <li
                        onClick={() => navClick(1)}
                        className={selectedIndex == 1 ? "selected" : ""}
                    >
                        <Link to="/dashboard">
                            <span className="icon">
                                <HomeIcon />
                            </span>
                            <span className="title">Dashboard</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(2)}
                        className={selectedIndex == 2 ? "selected" : ""}
                    >
                        <Link to="/patients">
                            <span className="icon">
                                <LocalHotelIcon />
                            </span>
                            <span className="title">Patients</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(3)}
                        className={selectedIndex == 3 ? "selected" : ""}
                    >
                        <Link to="/doctors">
                            <span className="icon">
                                <PeopleIcon />
                            </span>
                            <span className="title">Doctors</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(4)}
                        className={selectedIndex == 4 ? "selected" : ""}
                    >
                        <Link to="/purchases">
                            <span className="icon">
                                <ShoppingCartIcon />
                            </span>
                            <span className="title">Purchases</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(5)}
                        className={selectedIndex == 5 ? "selected" : ""}
                    >
                        <Link to="/suppliers">
                            <span className="icon">
                                <DirectionsRunIcon />
                            </span>
                            <span className="title">Suppliers</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(6)}
                        className={selectedIndex == 6 ? "selected" : ""}
                    >
                        <Link to="/medicines">
                            <span className="icon">
                                <MedicationIcon />
                            </span>
                            <span className="title">Medicines</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(7)}
                        className={selectedIndex == 7 ? "selected" : ""}
                    >
                        <Link to="invoices">
                            <span className="icon">
                                <DescriptionIcon />
                            </span>
                            <span className="title">Invoices</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(9)}
                        className={selectedIndex == 9 ? "selected" : ""}
                    >
                        <Link to="/users">
                            <span className="icon">
                                <ManageAccountsIcon />
                            </span>
                            <span className="title">My Account</span>
                        </Link>
                    </li>
                    <li
                        onClick={() => navClick(10)}
                        className={selectedIndex == 10 ? "selected" : ""}
                    >
                        <span className="icon">
                            <LogoutIcon />
                        </span>
                        <span className="title">Logout</span>
                    </li>
                </ul>
            </div>
            <div className={isOpen ? "pageContent opened" : "pageContent"}>
                <Outlet />
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
}
