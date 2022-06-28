import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

export default function StudentForm() {
  // const { register} = useForm({
  //   defaultValues: localStorage.getItem("data")
  // });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let id = localStorage.getItem("id");
    let edit = localStorage.getItem("edit");

    if (edit) {
      axios
        .put(`http://localhost:3001/auth/student/${id}`, {
          password: data.get("password"),
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          rollNo: data.get("rollNo"),
          admNo: data.get("admNo"),
          standard: data.get("standard"),
        })
        .then(function (response) {
          localStorage.removeItem("id");
          localStorage.removeItem("edit");
          navigate("/students");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      axios
      .post("http://localhost:3001/auth/student", {
        userId: "S" + `${data.get("userId")}`,
        password: data.get("password"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        role: "student",
        rollNo: data.get("rollNo"),
        admNo: data.get("admNo"),
        standard: data.get("standard"),
      })
      .then(function (response) {
        navigate("/students");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  };

  const handleStudent = () => {
    navigate("/students");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Student Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              // {localStorage.getItem("edit")=="true" ? value={localStorage.getItem("studId")}: ""}
              // id="outlined-read-only-input"
              label="Student ID"
              name="userId"
              autoComplete="userId"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              autoComplete="password"
              style={{ marginBottom: "23px" }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lastName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="rollNo"
              label="Class RollNo."
              name="rollNo"
              autoComplete="rollNo"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="admNo"
              label="Admission No"
              name="admNo"
              autoComplete="admNo"
              style={{ marginBottom: "14px" }}
              autoFocus
            />

            <FormControl fullWidth>
              <InputLabel>Standard</InputLabel>
              <Select
                margin="normal"
                required
                fullWidth
                id="standard"
                name="standard"
                label="Standard"
              >
                <MenuItem value="9">9th</MenuItem>
                <MenuItem value="10">10th</MenuItem>
                <MenuItem value="11">11th</MenuItem>
                <MenuItem value="12">12th</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>

            <Button
              onClick={handleStudent}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Go to All Students
            </Button>

            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
