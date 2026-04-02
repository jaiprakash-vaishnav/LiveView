import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../contexts/AuthContext";
import Snackbar from "@mui/material/Snackbar";
import WithAuth from "../utils/WithAuth.jsx";
import { Toaster, toast } from 'react-hot-toast';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [formState, setFormState] = React.useState(0);

  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let validateInput = (data)=>{
    return data.length < 6 || data.length > 12 ? true  : false;
  }

  let handleAuth = async () => {
    try {
      if(validateInput(username) || validateInput(password)){
        toast.error("username and password length atleast 6 characters.")
        return;
      }
      if (formState === 0) {
        let result = await handleLogin(username, password);
        toast.error(result);
      }
      if (formState === 1) {
        if(validateInput(name)){
          toast.error("Full name length atleast 6 characters.")
          return;
        }
        let result = await handleRegister(name, username, password);
        setName("");
        toast.success(result);
        setMessage(result);
        setOpen(true);
        setFormState(0);
      }
      setUsername("");
      setPassword("");
    } catch (err) {
      let message = err.response.data.message;
      toast.error(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster position="top-center" />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundImage: "url('./background.png')",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover ",
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="card"
            style={{
              display: "flex",
              width: "380px",
              padding: "30px",
              borderRadius: "16px",
              background: "#f5f6fa",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ m: 1, bgcolor: "secondary.main", marginBottom: "10%" }}
              >
                <LockOutlinedIcon />
              </Avatar>

              <div>
                <Button
                  variant={formState === 0 ? "contained" : ""}
                  onClick={() => {
                    setFormState(0);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  variant={formState === 1 ? "contained" : ""}
                  onClick={() => {
                    setFormState(1);
                  }}
                >
                  Sign Up
                </Button>
              </div>

              <Box component="form" noValidate sx={{ mt: 1 }}>
                {formState === 1 ? (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="fullname"
                    label="Full Name"
                    name="name"
                    value={name}
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <></>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={username}
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  value={password}
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleAuth}
                >
                  {formState === 0 ? "Login" : "Register"}
                </Button>
              </Box>
            </Box>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default WithAuth(Authentication);
