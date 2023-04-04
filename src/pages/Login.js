import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../store/userSlice";

const formFields = [
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

const Login = () => {
  const [credential, setCredentials] = useState(defaultState);
  const { isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credential.email, credential.password));
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
      <Link to="/signup" className="btn btn-link ">
        Create an account ?
      </Link>
      <button
        disabled={isLoading}
        type="submit"
        className="btn btn-primary w-100"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
