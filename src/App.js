import logo from './logo.svg';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import { DoctorDashboard } from './components/Doctor/DoctorDashboard';
import { PatientDashboard } from './components/Patient/PatientDashboard';
import { DoctorAppoints } from './components/Doctor/DoctorAppoints';
import { Sidebar2 } from './components/Sidebar2';
import { ReceptionistDashboard } from './components/Receptionist/ReceptionistDashboard';
import { RegistrationForm } from './components/Receptionist/RegistrationForm';
import { UpdateDetails } from './components/Receptionist/UpdateDetails';
import { ViewDeyails } from './components/Receptionist/ViewDeyails';
import { PretectedRoutes } from './components/hooks/PretectedRoutes';
import { Prescription } from './components/Doctor/Prescription';
import { PatientPrescription } from './components/Patient/PatientPrescription';
import { BookAppointment } from './components/Patient/BookAppointment';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { AddDoctor } from './components/Admin/AddDoctor';
import { AddRole } from './components/Admin/AddRole';
import { AllDocs } from './components/Admin/AllDocs';
import { AllPats } from './components/Admin/AllPats';
import { AllEmps } from './components/Admin/AllEmps';
import { ViewDocDetails } from './components/Admin/ViewDocDetails';
import { AllRole } from './components/Admin/AllRole';

function App() {

  const path = window.location.pathname;

  return (
    <body>
      <div className='wrapper'>
        {path === '/' || path === '' ? <Sidebar2 /> : <Sidebar />}
        <div className='main-panel'>
          <div className='content'>
            <Routes>
              <Route path = '/' element = {<Login />} />

              <Route element = {<PretectedRoutes />}>
                {/* Doctor routes */}
                <Route path = '/doctor/dashboard' element = {<DoctorDashboard />} />
                <Route path = '/doctor/prescription/:id' element = {<Prescription />} />

                {/* Patient routes */}
                <Route path = '/patient/dashboard' element = {<PatientDashboard />} />
                <Route path = '/patient/prescription/:id' element = {<PatientPrescription />} />
                <Route path = '/patient/appointment' element = {<BookAppointment />} />

                {/* Receptionist routes */}
                <Route path = '/receptionist/dashboard' element = {<ReceptionistDashboard />} />
                <Route path = '/receptionist/registrationform' element = {<RegistrationForm />} />
                <Route path = '/receptionist/updatedetails/:id' element = {<UpdateDetails />} />
                <Route path = '/receptionist/viewdetails/:id' element = {<ViewDeyails />} />

                {/* Admin routes */}
                <Route path = '/admin/dashboard' element = {<AdminDashboard />} />
                <Route path = '/admin/addDoctor' element = {<AddDoctor />} />
                <Route path = '/admin/addrole' element = {<AddRole />} />
                <Route path = '/admin/dashboard/alldoctor' element = {<AllDocs />} />
                <Route path = '/admin/dashboard/allpatients' element = {<AllPats />} />
                <Route path = '/admin/dashboard/allemployees' element = {<AllEmps />} />
                <Route path = '/admin/dashboard/allroles' element = {<AllRole />} />
                <Route path = '/admin/viewdetails/:id' element = {<ViewDocDetails />} />

              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
