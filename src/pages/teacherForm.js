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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Subject } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();
export default function TeacherForm(props) {

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let id = localStorage.getItem("id");
    let edit = localStorage.getItem("edit");

    if (edit) {
      axios
        .put(`http://localhost:3001/auth/faculty/${id}`, {
          userId: "F" + `${data.get("userId")}`,
          password: data.get("password"),
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          subject: data.get("subject"),
        })
        .then(function (response) {
          localStorage.removeItem("id");
          localStorage.removeItem("edit");
          navigate("/teachers");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      axios
      .post("http://localhost:3001/auth/faculty", {
        userId: "F" + `${data.get("userId")}`,
        password: data.get("password"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        subject: data.get("subject"),
        role: "faculty",
      })
      .then(function (response) {
        navigate("/teachers");
      })
      .catch(function (error) {
        console.log(error);
      });
    } 
  };

  const handleTeacher = () => {
    navigate("/teachers");
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
            Teacher Form
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
              // id="outlined-read-only-input"
              label="Teacher ID"
              // value={localStorage.getItem("userId")}
              name="userId"
              autoComplete="userId"
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
              style={{ marginBottom: "12px" }}
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
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                margin="normal"
                required
                fullWidth
                id="subject"
                label="Subject"
                name="subject"
              >
                <MenuItem value="maths">Maths</MenuItem>
                <MenuItem value="eng">English</MenuItem>
                <MenuItem value="cs">CS</MenuItem>
                <MenuItem value="physics">Physics</MenuItem>
                <MenuItem value="chemistry">Chemistry</MenuItem>
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
              onClick={handleTeacher}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Go to All Teachers
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
