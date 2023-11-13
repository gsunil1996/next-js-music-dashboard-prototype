"use client"

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from 'react';
import { useLoginMutation } from "../redux/features/auth/authApiSlice";
import { selectCurrentToken, setCredentials } from "../redux/features/auth/authSlice";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch();
  const [login, { isLoading, isError, isSuccess, reset, error, data }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    login({ email, password })
  }

  useEffect(() => {

    if (isSuccess) {
      dispatch(setCredentials(data?.accessToken))
      setEmail('')
      setPassword('')
      alert("You are logged in");
      reset()
      redirect('/dashboard')
    }
    if (isError) {
      alert(error?.data?.message)
      reset()
    }

  }, [isError, isSuccess, dispatch])

  useEffect(() => {
    if (token) {
      redirect("/dashboard")
    }
  }, [token])

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? <div>Loading ...</div> : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" style={{ color: "#1976d2" }}>
                Don not have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login