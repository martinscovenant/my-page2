import React from "react";
import { Route, Routes} from 'react-router-dom';
import { Login } from "./page/Login";
import {ViewSpecificReport } from "./components/ViewSpecificReport"
import { ViewAllReports } from "./components/ViewAllReports";

export default function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Login/>}/> 
      <Route path="/ViewAllReports" element={< ViewAllReports />}/> 
      <Route path="/ViewSpecificReport" element={<ViewSpecificReport/>}/>
      
    </Routes>
  );
}
