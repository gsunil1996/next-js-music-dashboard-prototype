"use client"

import { Box, Button, Container, Divider, Grid, TextField } from "@mui/material";
import { useRegisterMutation } from "../../redux/features/auth/authApiSlice";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLazyGetUsersQuery } from "../../redux/features/users/usersApiSlice";

const AddnewUser = (props) => {

  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };


  const [register, { isLoading, isError, isSuccess, reset, error }] = useRegisterMutation();

  const [getUsers] = useLazyGetUsersQuery();

  const initState = {
    name: "",
    email: "",
    password: "",
  };


  const [formValues, setFormValues] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    register({ username: formValues.name, email: formValues.email, password: formValues.password });
  };

  useEffect(() => {
    if (isSuccess) {
      setFormValues({
        name: "",
        email: "",
        password: "",
      })
      alert("user Added successfully");
      reset()
      getUsers()
      handleClose()
    }
    if (isError) {
      alert(error?.data?.message)
      reset()
    }

  }, [isError, isSuccess])

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="sm"
      >
        <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }} >
          <h1>Add New User</h1>
        </div>
        <Divider />
        <DialogContent>
          <Container component="main" maxWidth="sm">
            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: 2,
              }}
            >
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      label="Name"
                      value={formValues.name}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      label="Email Address"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isLoading ? <div>Loading ...</div> : "Add User"}
                </Button>
              </Box>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddnewUser