import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 20%",
    maxWidth: 950,
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },

  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
}));

function Report() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [s,setS] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const getStudent = () => {
    const id=JSON.parse(localStorage.getItem("user")).data.user.id;
    axios.get(`http://localhost:3001/student/${id}`).then(function (response) {
      localStorage.setItem("student", JSON.stringify(response.data.student));
    });
  };

  useEffect(() => {
    getStudent();
    getStudent();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          style={{ textDecorationLine: "underline", marginBottom: "3%" }}
        >
          Report Card
        </Typography>
        <Grid>
          <Typography>First Name: {JSON.parse(localStorage.getItem("student")).firstName}</Typography>
          <Typography>Last Name: {JSON.parse(localStorage.getItem("student")).lastName}</Typography>
          <Typography>Class: {JSON.parse(localStorage.getItem("student")).standard}</Typography>
          <Typography>Roll No.: {JSON.parse(localStorage.getItem("student")).rollNo}</Typography>
          <Typography>Admission No.: {JSON.parse(localStorage.getItem("student")).admNo}</Typography>
        </Grid>
      </div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Maths</TableCell>
              <TableCell className={classes.tableHeaderCell}>Computer Science</TableCell>
              <TableCell className={classes.tableHeaderCell}>English</TableCell>
              <TableCell className={classes.tableHeaderCell}>Physics</TableCell>
              <TableCell className={classes.tableHeaderCell}>Chemistry</TableCell>
              <TableCell className={classes.tableHeaderCell}>Percentage</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                <TableRow>
                  <TableCell>{JSON.parse(localStorage.getItem("student")).maths}</TableCell>
                  <TableCell>{JSON.parse(localStorage.getItem("student")).cs}</TableCell>
                  <TableCell>{JSON.parse(localStorage.getItem("student")).english}</TableCell>
                  <TableCell>{JSON.parse(localStorage.getItem("student")).physics}</TableCell>
                  <TableCell>{JSON.parse(localStorage.getItem("student")).chemistry}</TableCell>
                  <TableCell>{(parseFloat(JSON.parse(localStorage.getItem("student")).maths)+
                              parseFloat(JSON.parse(localStorage.getItem("student")).cs)+
                              parseFloat(JSON.parse(localStorage.getItem("student")).english)+
                              parseFloat(JSON.parse(localStorage.getItem("student")).physics)+
                              parseFloat(JSON.parse(localStorage.getItem("student")).chemistry))/5}%
                  </TableCell>
                </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        style={{ marginLeft: "45%" }}
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Go to Dashboard
      </Button>
    </>
  );
}

export default Report;
