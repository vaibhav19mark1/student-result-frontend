import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import SignIn from "./pages/login";
import Navbar from "./pages/dashboard";
import Result from "./pages/results";
import Teacher from "./pages/teachers";
import Student from "./pages/students";
import Report from "./pages/sreport";
import StudentForm from "./pages/studentForm";
import TeacherForm from "./pages/teacherForm";
import ResultForm from "./pages/resultForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn />}></Route>
        <Route exact path="/dashboard" element={<Navbar />}></Route>
        <Route exact path="/results" element={<Result />}></Route>
        <Route exact path="/teachers" element={<Teacher />}></Route>
        <Route exact path="/students" element={<Student />}></Route>
        <Route exact path="/sreport" element={<Report />}></Route>
        <Route exact path="/teacherForm" element={<TeacherForm />}></Route>
        <Route exact path="/studentForm" element={<StudentForm/>}></Route>
        <Route exact path="/resultForm" element={<ResultForm />}></Route>
        <Route exact path="/sreport" element={<Report />}></Route>
      </Routes>
    </Router>
  );
}

export default App;