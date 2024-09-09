import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axiosClient from "../axois-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    // const navigate = useNavigate();

    const { setUser, setToken, setSelectedIndex } = useStateContext();

    const [errors, setErrors] = useState(null);

    // const goSignup = () => {
    //     navigate("/signup");
    // };

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setErrors(null);

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setSelectedIndex(localStorage.setItem("PHARMACY_LIST", 1));
            })
            .catch((error) => {
                const response = error.response;

                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            email: [response.data.message],
                        });
                    }
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form" onSubmit={onSubmit}>
                <form className="signup">
                    <h2>Login Into Your Account</h2>
                    <div className="errors show">
                        {errors &&
                            Object.keys(errors).map((key) => (
                                <h3 key={key}>{errors[key][0]}</h3>
                            ))}
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input type="email" ref={emailRef} />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" ref={passwordRef} />
                    </div>
                    <input
                        type="submit"
                        value="Login"
                        id="submit-btn"
                        name="signup"
                    />
                    <div className="question">
                        <p>
                            {/* Don&apos;t Have Acount?{" "}
                            <span data-class="signup" onClick={goSignup}>
                                Sign Up Now
                            </span> */}
                            For Testing
                            <br />
                            <br />
                            Email: user@user.com
                            <br />
                            <br />
                            Password: user@user
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
