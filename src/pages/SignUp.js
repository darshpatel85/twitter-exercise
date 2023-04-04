import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../store/userSlice";

const formFields = [
  {
    name: "firstname",
    type: "text",
    label: "First Name",
  },
  {
    name: "lastname",
    type: "text",
    label: "Last Name",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
  },
];

const defaultState = formFields.reduce(
  (acc, cur) => ({ ...acc, [cur.name]: "" }),
  {}
);

const SignUp = () => {
  const [credential, setCredentials] = useState({ ...defaultState });
  const { isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(credential));
  };
  return (
    <form className="container w-50 mt-5" onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      {formFields.map(({ label, name, type }) => (
        <div key={name} className="mb-3">
          <label className="form-label">{label}</label>
          <input
            type={type}
            value={credential[name]}
            name={name}
            required
            onChange={handleChange}
            className="form-control"
          />
        </div>
      ))}
      <Link to="/login" className="btn btn-link">
        Already a member ?
      </Link>
      <button
        disabled={isLoading}
        type="submit"
        className="btn btn-primary w-100"
      >
        SignUp
      </button>
    </form>
  );
};

export default SignUp;
