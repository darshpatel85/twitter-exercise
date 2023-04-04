import { useState } from "react";

const formFields = [
  {
    name: "firstName",
    type: "text",
    label: "First Name"
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name"
  },
  {
    name: "email",
    type: "email",
    label: "Email"
  },
  {
    name: "password",
    type: "password",
    label: "Password"
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password"
  }
];

const defaultState = formFields.reduce(
  (acc, cur) => ({ ...acc, [cur.name]: "" }),
  {}
);

const SignUp = () => {
  const [credential, setCredentials] = useState({ ...defaultState });

  const handleChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="container">
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
        SignUp
      </button>
    </form>
  );
};

export default SignUp;
