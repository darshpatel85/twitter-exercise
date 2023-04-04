import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";

const formFields = [
  {
    name: "email",
    type: "email",
    label: "Email"
  },
  {
    name: "password",
    type: "password",
    label: "Password"
  }
];
const defaultState = formFields.reduce(
  (acc, cur) => ({ ...acc, [cur.name]: "" }),
  {}
);

const Login = () => {
  const [credential, setCredentials] = useState({ ...defaultState });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ ...credential }));
    setCredentials({ ...defaultState });
  };
  return (
    <form className="container" onSubmit={handleSubmit}>
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
      <button type="submit" className="btn btn-primary w-100">
        Login
      </button>
    </form>
  );
};

export default Login;
