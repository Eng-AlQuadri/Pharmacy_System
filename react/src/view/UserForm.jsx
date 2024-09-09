import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axois-client";

export default function UserForm() {
    const [errors, setErrors] = useState();

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        name: "",
        email: "",
    });

    const { setNotification } = useStateContext();

    const { id } = useParams();

    const navigate = useNavigate();

    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/users/${id}`).then(({ data }) => {
                setLoading(false);
                setUser(data);
            });
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        setErrors(null);
        axiosClient
            .put(`/users/${user.id}`, user)
            .then(() => {
                setNotification("Your Account Was Updated Successfully");

                navigate("/users");
            })
            .catch((error) => {
                const response = error.response;

                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                {loading && <div className="loading">Loading...</div>}

                {!loading && (
                    <form className="signup" onSubmit={onSubmit}>
                        {id && <h2>Edit Your Account</h2>}
                        <h3>Name: {user.name}</h3>
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
                                    setUser({
                                        ...user,
                                        name: e.target.value,
                                    })
                                }
                                type="text"
                                value={user.name}
                            />
                        </div>
                        <div className="field">
                            <label>Email</label>
                            <input readOnly type="text" value={user.email} />
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
