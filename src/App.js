
import './App.css';
import SignUp from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import PatientList from './pages/PatientList';
import DoctorList from './pages/DoctorList';
import ProfessionalProfile from './pages/ProfessionalProfile';
import EditProfessionalProfile from './pages/EditProfessionalProfile';
function App() {

  return (
    <div>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/profile/patientlist" element={<PatientList />} />
          <Route path="/profile/doctorlist" element={<DoctorList />} />
          <Route path="/profile/professionalprofile" element={<ProfessionalProfile />} />
          <Route path="/profile/professionalprofile/editprofessionalprofile" element={<EditProfessionalProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
