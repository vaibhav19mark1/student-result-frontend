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
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@mui/icons-material/Edit";
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
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

function Teacher() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [teacher, setTeacher] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleEdit(id,userId) {
    localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("userId", JSON.stringify(userId));
    localStorage.setItem("edit", JSON.stringify(true));
    navigate("/teacherForm");
  }
  const handleNew = () => {
    navigate("/teacherForm");
  };

  const getFaculty = () => {
    axios.get("http://localhost:3001/auth/faculty").then(function (response) {
      // console.log(response.data.faculties);
      setTeacher(Object.values(response.data.faculties));
    });
  };

  useEffect(() => {
    getFaculty();
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        style={{ marginLeft: "75%", marginTop: "20px" }}
        onClick={handleNew}
      >
        Add new
      </Button>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>ID</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                First Name
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Last Name
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>Subject</TableCell>
              <TableCell className={classes.tableHeaderCell}>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teacher
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.subject}</TableCell>
                  <TableCell><Button onClick={() => { handleEdit(row.id,row.userId);}}><EditIcon /></Button></TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={teacher.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
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

export default Teacher;
