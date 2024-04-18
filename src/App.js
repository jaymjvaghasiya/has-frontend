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
import { Payment } from './components/Patient/Payment';
import { UpdateDocDetail } from './components/Admin/UpdateDocDetail';
import { UpdatePatDetails } from './components/Patient/UpdatePatDetails';
import { UpdateDocPerProfile } from './components/Doctor/UpdateDocPerProfile';
import { ForgetPass } from './components/ForgetPass';
import { GetOtp } from './components/GetOtp';
import { UpdatePass } from './components/UpdatePass';
import { Paymentwithcard } from './components/Patient/Paymentwithcard';
import { Paymentwithgpay } from './components/Patient/Paymentwithgpay';
import { Otpforcard } from './components/Patient/Otpforcard';
import { AddEmp } from './components/Admin/AddEmp';
import { ViewEmpDetails } from './components/Admin/ViewEmpDetails';
import { UpdateEmpDetails } from './components/Admin/UpdateEmpDetails';

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
              <Route path = '/forgetpassword' element = {<ForgetPass />} />
              <Route path = '/getotp' element = {<GetOtp />} />
              <Route path = '/updatePass' element = {<UpdatePass />} />

              <Route element = {<PretectedRoutes />}>
                {/* Doctor routes */}
                <Route path = '/doctor/dashboard' element = {<DoctorDashboard />} />
                <Route path = '/doctor/prescription/:id' element = {<Prescription />} />
                <Route path = '/doctor/updatedocperprofile' element = {<UpdateDocPerProfile />} />

                {/* Patient routes */}
                <Route path = '/patient/dashboard' element = {<PatientDashboard />} />
                <Route path = '/patient/prescription/:id' element = {<PatientPrescription />} />
                <Route path = '/patient/appointment' element = {<BookAppointment />} />
                <Route path = '/patient/updateprofile' element = {<UpdatePatDetails />} />
                <Route path = '/patient/makepayment' element = {<Payment />} />
                <Route path = '/patient/paymentwithcard' element = {<Paymentwithcard />} />
                <Route path = '/patient/otpforcard' element = {<Otpforcard />} />

                {/* Receptionist routes */}
                <Route path = '/receptionist/dashboard' element = {<ReceptionistDashboard />} />
                <Route path = '/receptionist/registrationform' element = {<RegistrationForm />} />
                <Route path = '/receptionist/updatedetails/:id' element = {<UpdateDetails />} />
                <Route path = '/receptionist/viewdetails/:id' element = {<ViewDeyails />} />

                {/* Admin routes */}
                <Route path = '/admin/dashboard' element = {<AdminDashboard />} />
                <Route path = '/admin/addDoctor' element = {<AddDoctor />} />
                <Route path = '/admin/addrole' element = {<AddRole />} />
                <Route path = '/admin/addEmployee' element = {<AddEmp />} />
                <Route path = '/admin/dashboard/alldoctor' element = {<AllDocs />} />
                <Route path = '/admin/dashboard/allpatients' element = {<AllPats />} />
                <Route path = '/admin/dashboard/allemployees' element = {<AllEmps />} />
                <Route path = '/admin/dashboard/allroles' element = {<AllRole />} />
                <Route path = '/admin/viewdetails/:id' element = {<ViewDocDetails />} />
                <Route path = '/admin/updatedetails/:id' element = {<UpdateDocDetail />} />
                <Route path = '/admin/viewempdetails/:id' element = {<ViewEmpDetails />} />
                <Route path = '/admin/updateempdetails/:id' element = {<UpdateEmpDetails />} />

              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
