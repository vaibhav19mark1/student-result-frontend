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
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 650,
    },
    tableContainer: {
        borderRadius: 15,
        margin: '10px 20%',
        maxWidth: 950
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

function Result() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [student,setStudent]= React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = ()=> {
    
    navigate("/resultForm");
  }
  
  const getStudent = () => {
    axios.get("http://localhost:3001/auth/student").then(function (response) {
      setStudent(Object.values(response.data.students));
    });
  };

  function handleEditMarks(id,rollNo){
    localStorage.setItem("id", JSON.stringify(id));
    localStorage.setItem("edit", JSON.stringify(true));
    localStorage.setItem("rollNo", JSON.stringify(rollNo));
    navigate("/resultForm");
  }

  useEffect(() => {
    getStudent();
    getStudent();
  }, []);

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>ID</TableCell>
              <TableCell className={classes.tableHeaderCell}>Class</TableCell>
              <TableCell className={classes.tableHeaderCell}>RollNo</TableCell>
              <TableCell className={classes.tableHeaderCell}>Maths</TableCell>
              <TableCell className={classes.tableHeaderCell}>English</TableCell>
              <TableCell className={classes.tableHeaderCell}>Physics</TableCell>
              <TableCell className={classes.tableHeaderCell}>Chemistry</TableCell>
              <TableCell className={classes.tableHeaderCell}>CS</TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Edit Marks
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.standard}</TableCell>
                  <TableCell>{row.rollNo}</TableCell>
                  <TableCell>{row.maths}</TableCell>
                  <TableCell>{row.english}</TableCell>
                  <TableCell>{row.physics}</TableCell>
                  <TableCell>{row.chemistry}</TableCell>
                  <TableCell>{row.cs}</TableCell>
                  <TableCell>
                    <Button onClick={()=>{handleEditMarks(row.id,row.rollNo)}}><EditIcon fontSize="small" /></Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter></TableFooter>
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

export default Result;