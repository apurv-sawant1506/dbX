import * as React from "react";
import { useState } from "react";
import { useLogin, useNotify, Notification } from "react-admin";
// import { ThemeProvider } from '@material-ui/styles';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const doRegister = async ({ username, password, name, orgUnit }) => {
  console.log("login", JSON.stringify({ username, password, name, orgUnit }));
  const request = new Request("http://localhost:8081/auth/signup", {
    method: "POST",
    body: JSON.stringify({ username, password, name, orgUnit }),
    headers: new Headers({ "Content-Type": "application/json" }),
  });
  const response = await fetch(request);
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.statusText);
  }

  Promise.resolve();
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [orgUnit, setOrgUnit] = useState("");
  const doLogin = useLogin();
  const notify = useNotify();
  const submit = (e) => {
    e.preventDefault();
    doLogin({ username, password }).catch(({ error, status }) => {
      var msg = "";
      if (status === 400 || status === 401) {
        msg = "Invalid Password";
      } else {
        msg = error.message;
      }
      console.log("login err", error);
      console.log(msg);
      notify(msg);
    });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    doRegister({ username, password, name, orgUnit })
      .then(() => {
        setIsLogin(true);
        setUsername("");
        setName("");
        setOrgUnit("");
        setPassword("");
        notify("Registration successful");
      })
      .catch(() => notify("Username already taken"));
  };

  const classes = useStyles();

  const login = (
    <form className={classes.form} onSubmit={submit} noValidate>
      <TextField
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
      />
      <TextField
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link
            href=""
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(false);
              setName("");
              setUsername("");
              setPassword("");
              setOrgUnit("");
            }}
            variant="text"
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </form>
  );

  const register = (
    <form className={classes.form} onSubmit={submitRegister} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            name="name"
            variant="outlined"
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" required={true} fullWidth={true}>
            <InputLabel id="orgUnit">Organization Unit</InputLabel>
            <Select
              labelId="orgUnit"
              id="orgUnit"
              value={orgUnit}
              onChange={(e) => setOrgUnit(e.target.value)}
              label="Organization Unit"
              autoWidth={true}
            >
              <MenuItem value={1}>OrgUnit1</MenuItem>
              <MenuItem value={2}>OrgUnit2</MenuItem>
              <MenuItem value={3}>OrgUnit3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign Up
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link
            href=""
            onClick={(e) => {
              e.preventDefault();
              setIsLogin(true);
              setName("");
              setUsername("");
              setPassword("");
              setOrgUnit("");
            }}
            variant="text"
          >
            Already have an account? Log in
          </Link>
          <Link href="#" variant="body2"></Link>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? "Signin" : "Signup"}
        </Typography>
        {isLogin ? login : register}
        <Notification />
      </div>
    </Container>
  );
};

export default Login;
