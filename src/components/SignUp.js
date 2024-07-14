import react, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/Config";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import "../styling/Login.css";

export const SignUP = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Uname, setUname] = useState("");
  const handleReg = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          Username: Uname,
        });
      }

      toast.success("User Registered Successfully!!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="login-container">
        <form onSubmit={handleReg}>
          <h1>Sign Up</h1>

          <div className="mb-3">
            <label>User name</label>
            <input
              type="text"
              className="form-control"
              placeholder="User name"
              onChange={(e) => setUname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUP;
