import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Link } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "../Style/Home.css";
import Header from "./Navbar";
const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [logincount, setLogincount] = useState(0);

  const navigate = useNavigate();

  const handleOnchange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getItemdata = localStorage.getItem("LoginCount");
    if (getItemdata) {
      setLogincount(parseInt(getItemdata));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLogincount((prevCount) => prevCount + 1);

    localStorage.setItem("LoginCount", logincount + 1);

    localStorage.setItem("LoginDate", new Date().toLocaleString());
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <>
      <Header />
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Box
          sx={{
            pt: 2,
            pl: 6,
            pr: 6,
            textAlign: "center",
            width: 400,
            height: 400,
            backgroundColor: "white",
            mt: 10,
            mb: 12,
            boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.3)",
          }}
        >
          <div>
            <h1 style={{ marginBottom: "6px" }}>Login</h1>
            <span>
              Don't you have an account ? &nbsp;{" "}
              <Link href="/" style={{ cursor: "pointer" }}>
                Sign Up
              </Link>
            </span>
            <form onSubmit={handleSubmit}>
              <TextField
                style={{ margin: "30px 0px 30px 0px" }}
                type="email"
                name="email"
                onChange={handleOnchange}
                fullWidth
                label="Email"
                id="fullWidth"
              />
              <TextField
                style={{ marginBottom: "30px" }}
                type="password"
                name="password"
                onChange={handleOnchange}
                minLength={6}
                fullWidth
                label="Password"
                id="fullWidth"
              />
              <Button
                type="submit"
                variant="contained"
                style={{ width: "100%" }}
              >
                
                Sign In
         
              </Button>
            </form>
          </div>
        </Box>
      </div>
    </>
  );
};

export default Login;
