import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// MUI Imports
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const initialSignupCredentials = {
	username: "",
	password: "",
	phone_number: "",
};
const Signup = () => {
	const [signupCredentials, setSignupCredentials] = useState(
		initialSignupCredentials,
	);
	const history = useHistory();

	const handleChange = (event) => {
		setSignupCredentials({
			...signupCredentials,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		SignupUser();
	};

	const SignupUser = () => {
		axios
			.post(
				"https://tt157-backend.herokuapp.com/api/auth/register",
				signupCredentials,
			)
			.then((response) => {
				console.log(response);
				history.push("/");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	function Copyright() {
		return (
			<Typography variant="body2" color="textSecondary" align="center">
				{"Copyright © "}
				<Link color="inherit" href="https://material-ui.com/">
					WebPT_157 @LambdaSchool
				</Link>{" "}
				{new Date().getFullYear()}
				{"."}
			</Typography>
		);
	}

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
			marginTop: theme.spacing(3),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}));

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form onSubmit={handleSubmit} className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								type="text"
								value={signupCredentials.username}
								onChange={handleChange}
								autoComplete="uname"
								name="username"
								variant="outlined"
								required
								fullWidth
								id="userName"
								label="Username"
								autoFocus
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								value={signupCredentials.password}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="phoneNumber"
								label="Phone Number"
								type="tel"
								name="phone_number"
								autoComplete="pnumber"
								value={signupCredentials.phone_number}
								onChange={handleChange}
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
							<Link href="/" variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};
export default Signup;
