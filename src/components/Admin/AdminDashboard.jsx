import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const AdminDashboard = () => {

  const [allDoctors, setallDoctors] = useState()
  const [allPatients, setallPatients] = useState()
  const [allEmployees, setallEmployees] = useState()
  const [allroles, setallroles] = useState()

  const getalldoctors = async () => {
    let res = await axios.get('http://localhost:3001/doctor');
    setallDoctors(res.data.data.length);
  }
  const getallpatient = async () => {
    let res = await axios.get('http://localhost:3001/patient');
    setallPatients(res.data.data.length);
  }
  const getallemployees = async () => {
    let res = await axios.get('http://localhost:3001/employee');
    setallEmployees(res.data.data.length);
  }
  const getallroles = async () => {
    let res = await axios.get('http://localhost:3001/role');
    setallroles(res.data.data.length);
  }

  useEffect(() => {
    getalldoctors();
    getallpatient();
    getallemployees();
    getallroles();
  }, [])


  return (
    <>
      <div className='admin-container-dashboard'>
        <div className="subContainer">
          <div className="outerbox">
            <div className="outer-title">Doctors</div>
            <div className="innerbox">
              <p>{allDoctors}</p>
            </div>
            <div className="view-all"><Link to='/admin/dashboard/alldoctor'>View</Link></div>
          </div>
        </div>
        <div className="subContainer">
          <div className="outerbox">
            <div className="outer-title">Patients</div>
            <div className="innerbox">
              <p>{allPatients}</p>
            </div>
            <div className="view-all"><Link to='/admin/dashboard/allpatients'>View</Link></div>
          </div>
        </div>
        <div className="subContainer">
          <div className="outerbox">
            <div className="outer-title">Employees</div>
            <div className="innerbox">
              <p>{allEmployees}</p>
            </div>
            <div className="view-all"><Link to='/admin/dashboard/allemployees'>View</Link></div>
          </div>
        </div>
      </div>
      <div className='admin-container-dashboard'>
        <div className="subContainer">
          <div className="outerbox">
            <div className="outer-title">Roles</div>
            <div className="innerbox">
              <p>{allroles}</p>
            </div>
            <div className="view-all"><Link to='/admin/dashboard/allroles'>View</Link></div>
          </div>
        </div>
      </div>
    </>
  )
}
