import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./services/operations/authAPI";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import HomePage from "./Pages/HomePage";
import MotorEntry from "./Pages/Data Entry/MotorEntry";
import NonMotorEntry from "./Pages/Data Entry/NonMotorEntry";
import MotorRenewalEntry from "./Pages/Add On Entry/MotorRenewalEntry";
import MotorAddonEntry from "./Pages/Add On Entry/MotorAddonEntry";
import NonMotorAddonEntry from "./Pages/Add On Entry/NonMotorAddonEntry";
import AddAgent from "./Pages/Manage User/AddAgent";
import ViewAgent from "./Pages/Manage User/ViewAgent";
import ManageRM from "./Pages/Manage User/ManageRM";
import ManageCompany from "./Pages/Manage User/ManageCompany";
import ManageMake from "./Pages/Manage User/ManageMake";
import ManageModal from "./Pages/Manage User/ManageModal";
import MotorReport from "./Pages/Reporting/MotorReport";
import NonMotorReport from "./Pages/Reporting/NonMotorReport";
import ExportData from "./Pages/Export/ExportData";
import ExportReport from "./Pages/Export/ExportReport";
import MotorReportDetails from "./Components/Core/MotorReportDetails";
import NonMotorReportDetails from "./Components/Core/NonMotorReportDetails";

function App() {

  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(user?._id === undefined){
      dispatch(logout(navigate));
    } 
  },[]);

  return (
    <div className="w-screen h-screen flex font-fira overflow-hidden">
      
      <Routes>
        <Route path="/login" element={user ? <Navigate to={"/"}/> : <LoginPage/>}/>
        <Route path="/signup" element={user ? <Navigate to={"/"}/> : <SignupPage/>}/>
        <Route path="/" element={user ? <Dashboard/> : <Navigate to={'/login'}/>}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/data-entry/motor-entry" element={<MotorEntry/>}/>
          <Route path="/data-entry/non-motor-entry" element={<NonMotorEntry/>}/>
          <Route path="/add-on-entry/motor-renewal-entry" element={<MotorRenewalEntry/>}/>
          <Route path="/add-on-entry/motor-addon-entry" element={<MotorAddonEntry/>}/>
          <Route path="/add-on-entry/non-motor-addon-entry" element={<NonMotorAddonEntry/>}/>
          <Route path="/manage-user/add-agent" element={<AddAgent/>}/>
          <Route path="/manage-user/view-agent" element={<ViewAgent/>}/>
          <Route path="/manage-user/manage-rm" element={<ManageRM/>}/>
          <Route path="/manage-user/manage-company" element={<ManageCompany/>}/>
          <Route path="/manage-user/manage-make" element={<ManageMake/>}/>
          <Route path="/manage-user/manage-model" element={<ManageModal/>}/>
          <Route path="/reporting/motor-report" element={<MotorReport/>}/>
          <Route path="/reporting/non-motor-report" element={<NonMotorReport/>}/>
          <Route path="/export/export-data" element={<ExportData/>}/>
          <Route path="/export/export-report" element={<ExportReport/>}/>
          <Route path="/reporting/motor-report-details" element={<MotorReportDetails/>}/>
          <Route path="/reporting/non-motor-report-details" element={<NonMotorReportDetails/>}/>
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>

    </div> 
  );  
}

export default App;
