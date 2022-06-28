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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

export default function ResultForm(props) {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let id = localStorage.getItem("id");
    let edit = localStorage.getItem("edit");
    if (edit) {
      axios
        .put(`http://localhost:3001/faculty/${id}`, {
          cs: data.get("cs"),
          english: data.get("english"),
          maths: data.get("maths"),
          physics: data.get("physics"),
          chemistry: data.get("chemistry"),
        })
        .then(function (response) {
          localStorage.removeItem("id");
          localStorage.removeItem("edit");
          navigate("/results");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleNew = () => {
    navigate("/results");
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
            Result Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              // id="outlined-read-only-input"
              fullWidth
              // value={localStorage.getItem("rollNo")}
              required
              label="Roll No"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="english"
              label="English"
              name="english"
              autoComplete="english"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="maths"
              label="Mathematics"
              name="maths"
              autoComplete="maths"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="cs"
              label="Computer Science"
              name="cs"
              autoComplete="cs"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="physics"
              label="Physics"
              name="physics"
              autoComplete="physics"
              style={{ marginBottom: "14px" }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="chemistry"
              label="Chemistry"
              name="chemistry"
              autoComplete="chemistry"
              style={{ marginBottom: "14px" }}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>

            <Button
              onClick={handleNew}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Go To All Results
            </Button>
            <Grid container></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
