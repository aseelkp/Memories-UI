import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { AUTH } from "../../constants/actionTypes";
import jwt_decode from "jwt-decode";
import { signin , signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState)
  const history = useHistory();

  const dispatch = useDispatch();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup) {
      dispatch(signup(formData, history))
    }else {
      dispatch(signin(formData, history))
    }
  };
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  const googleSuccess = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    const response = jwt_decode(token);

    try {
      dispatch({ type: AUTH, data: { token , response } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = (err) => { 
    console.log(err, "==> error in google sign in");
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "Sign Up " : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />

                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up " : "Sign In"}
            </Button>
            <GoogleLogin
            	allowed_parent_origin="http://localhost:3000"
              className={classes.googleButton}
              onSuccess={(credentialResponse) => {
                
                googleSuccess(credentialResponse);
              }}
              onError={() => {
                googleError();
              }}
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign In"
                    : "Dont have an account? Sign Up "}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
  );
};

export default Auth;
