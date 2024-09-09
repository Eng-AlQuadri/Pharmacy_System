import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axois-client";

export default function Signup() {
    const navigate = useNavigate();

    const [errors, setErrors] = useState(null);

    const { setUser, setToken, setSelectedIndex } = useStateContext();

    const goLogin = () => {
        navigate("/login");
    };

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        setErrors(null);

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setSelectedIndex(localStorage.setItem("PHARMACY_LIST", 1));
            })
            .catch((errors) => {
                const response = errors.response;

                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form className="signup" onSubmit={onSubmit}>
                    <h2>Signup For Free</h2>
                    <div className="serrors show">
                        {errors &&
                            Object.keys(errors).map((key) => (
                                <h3 key={key}>{errors[key][0]}</h3>
                            ))}
                    </div>
                    <div className="field">
                        <label>Name</label>
                        <input ref={nameRef} type="text" required />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input ref={emailRef} type="email" required />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input ref={passwordRef} type="password" required />
                    </div>
                    <div className="field">
                        <label>Password Confirmation</label>
                        <input
                            ref={passwordConfirmationRef}
                            type="password"
                            required
                        />
                    </div>
                    <input
                        type="submit"
                        value="Signup"
                        id="submit-btn"
                        name="signup"
                    />
                    <div className="question">
                        <p>
                            Already Signed Up?{" "}
                            <span data-class="login" onClick={goLogin}>
                                Login Now
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
