import logo from "./logo.jpg";
import "./register.css";
import React, { useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function toasted(type = "error", text) {
  toast[type](`${text}`, {
    className: "black-background",
    position: "top-left",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
function App() {
  const initialstate = {
    input: [],
    names: "",
    email: "",
    password: 1,
    check: false,
    id: 1,
    lowerCase: false,
    upperCase: false,
    aNumber: false,
    character8: false,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "setInput":
        return {
          ...state,
          input: action.payload,
        };
      case "setNickName":
        return {
          ...state,
          names: action.payload,
        };
      case "setFirstName":
        return {
          ...state,
          names: action.payload,
        };
      case "setLastName":
        return {
          ...state,
          names: action.payload,
        };
      case "setEmail":
        return {
          ...state,
          email: action.payload,
        };
      case "password":
        return {
          ...state,
          password: action.payload,
        };
      case "checkBox":
        return {
          ...state,
          check: action.payload,
        };
      case "id":
        return {
          ...state,
          id: action.payload,
        };
      case "lowerCase":
        return {
          lowerCase: action.payload,
        };
      case "upperCase":
        return {
          upperCase: action.payload,
        };
      case "validateNumber":
        return {
          aNumber: action.payload,
        };
      case "validateCharacter":
        return {
          character8: action.payload,
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialstate);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const formHandler = (event) => {
    event.preventDefault();
    const checkRepeat = JSON.parse(localStorage.getItem("users") || "[]");
    let checkValidate;
    console.log(event);
    const emailValidator = validateEmail(`${state.email}`);
    if (state.names.length <= 3) {
      toasted("error", "User name Value Must Be Bigger Than 3 Chars");
      return;
    }
    if (!emailValidator) {
      toasted("error", "Email Must be Valid Email");
      return;
    }
    checkRepeat.map((data) => {
      if (data.email == state.input.email) {
        toasted("error", "This Email is Already Exist!");
        checkValidate = false;
      } else {
        checkValidate = true;
      }
    });
    if (checkValidate === false) {
      return;
    }
    if (!state.password) {
      toasted("error", "pass");
      return;
    }
    if (!state.check) {
      toasted("error", "Check Box must be Checked");
      return;
    }

    const get = JSON.parse(localStorage.getItem("users") || "[]");

    dispatch({ type: "id", payload: state.id + 1 });
    get.push(state.input);

    // Trigger
    // let mp;
    mp.trigger("RegisterPlayer", get);

    // localStorage.setItem("users", JSON.stringify(get));
    toasted("success", "Hoorah You did It");
    document.getElementById("sign_form").style.boxShadow =
      "1px 2px 145px 52px rgba(0,255,19,0.75)";
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    passwordValidator(event);
    console.log(event);

    if (name == "firstname") {
      dispatch({ type: "setFirstName", payload: value });
    } else if (name == "lastname") {
      dispatch({ type: "setLastName", payload: value });
    } else if (name == "age") {
      dispatch({ type: "setAge", payload: value });
    } else if (name == "birth") {
      dispatch({ type: "setBirth", payload: value });
    } else if (name == "email") {
      dispatch({ type: "setEmail", payload: value });
    } else if (name == "password") {
      dispatch({ type: "password", payload: value });
    } else if (name == "checkbox") {
      dispatch({ type: "checkBox", payload: event.target.checked });
    }
    // setInputs((values) => ({ ...values, id: id, [name]: value }));
    let objCr = { ...state.input, id: state.id, [name]: value };
    dispatch({ type: "setInput", payload: objCr });

    !event.target.value
      ? (event.target.style.border = "1px solid red")
      : (event.target.style.border = "1px solid #ffd80e");
  };

  function passwordValidator(event) {
    let letter = document.getElementById("letter");
    let capital = document.getElementById("capital");
    let number = document.getElementById("number");
    let length = document.getElementById("length");

    const lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;

    if (event.target.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    if (event.target.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    if (event.target.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }
    if (event.target.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }
  return (
    <>
      <div>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* <img src={logo} /> */}
        <div className="Register-form">
          <form
            action="/"
            className="sign__form"
            id="sign_form"
            onSubmit={formHandler}
          >
            <div className="text-form">
              <div className="top">Welcome</div>
            </div>
            <div className="sign__group">
              <input
                type="text"
                className="sign__input"
                name="firstname"
                title="What Should We Call you?"
                placeholder="First Name"
                onChange={handleChange}
              />
            </div>

            <div className="sign__group">
              <input
                type="text"
                className="sign__input"
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>
            <div className="sign__group">
              <input
                type="number"
                className="sign__input"
                name="age"
                placeholder="Age"
                onChange={handleChange}
              />
            </div>

            <div className="sign__group">
              <input
                type="date"
                className="sign__input"
                name="birth"
                placeholder="Date Of Birth"
                title="Like 11/09/1982"
                onChange={handleChange}
              />
            </div>

            <div className="sign__group">
              <input
                type="text"
                className="sign__input"
                name="email"
                placeholder="Email"
                title="An Email To Veryfie"
                onChange={handleChange}
              />
            </div>

            <div className="sign__group">
              <input
                id="password"
                type="password"
                className="sign__input"
                name="password"
                placeholder="Password"
                onChange={passwordValidator}
                // onChange={handleChange}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                onFocus={() => {
                  document.getElementById("message").style.display = "block";
                }}
                onBlur={() => {
                  document.getElementById("message").style.display = "none";
                }}
              />
            </div>

            <div className="sign__group sign__group--checkbox">
              <input
                id="remember"
                name="checkbox"
                type="checkbox"
                onChange={handleChange}
              />
              <label htmlFor="remember">
                I agree to the Privacy Policy of this server
              </label>
            </div>

            <input type="submit" className="sign__btn" value="Sign Up" />
          </form>
          <div id="message">
            <h3>Password must contain the following:</h3>
            <p id="letter" className="invalid">
              A <b>lowercase</b> letter
            </p>
            <p id="capital" className="invalid">
              A <b>capital (uppercase)</b> letter
            </p>
            <p id="number" className="invalid">
              A <b>number</b>
            </p>
            <p id="length" className="invalid">
              Minimum <b>8 characters</b>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
