import faker from 'faker';
import React, { useEffect } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TablePagination,
  TableFooter
} from '@material-ui/core';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 900,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 20%',
        maxWidth: 990
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

function Student() {
  const classes = useStyles();
  const [student,setStudent]= React.useState([]);
  const navigate = useNavigate();
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
    localStorage.setItem("studId", JSON.stringify(userId));
    localStorage.setItem("edit", JSON.stringify(true));
    navigate("/studentForm");
  }

  const getStudents = () => {
    axios.get("http://localhost:3001/auth/student").then(function (response) {
      // console.log(response);
      setStudent(Object.values(response.data.students));
    });
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleNew = ()=> {
    navigate("/studentForm");
  }

  return (
    <>
    <Button variant="outlined" style={{marginLeft: "75%", marginTop: "20px"}} onClick={handleNew}>Add new</Button>
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>First Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Last Name</TableCell>
            <TableCell className={classes.tableHeaderCell}>Roll No</TableCell>
            <TableCell className={classes.tableHeaderCell}>Admission No</TableCell>
            <TableCell className={classes.tableHeaderCell}>Class</TableCell> 
           <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {student.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.rollNo}>
              <TableCell>{row.firstName}</TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.rollNo}</TableCell>
              <TableCell>{row.admNo}</TableCell>
              <TableCell>{row.standard}</TableCell>
              <TableCell><Button onClick={() => { handleEdit(row.id,row.userId);}}><EditIcon /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        
        </TableFooter>
      </Table>
      <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={student.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </TableContainer>
    <Button variant="contained" style={{marginLeft: "45%"}} onClick={()=>{navigate("/dashboard")}}>Go to Dashboard</Button>
    </>
  );
}

export default Student;