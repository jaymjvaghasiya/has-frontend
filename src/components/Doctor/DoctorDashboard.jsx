import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DoctorDashboard = () => {

  let index = 0;
  let [opdPatients, setopdPatients] = useState([])

  const getAllopdpatients = async () => {
    try {
      const res = await axios.get('http://localhost:3001/patient/status');
      setopdPatients(res.data.data);
      console.log(opdPatients);
    } catch (e) {
      console.log(e);
    }
  }

  const consultOnlie = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3001/opdpatient/${id}`);
      toast.success('Meeting ID is sent', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllopdpatients();
  }, [])

  let target;
  window.addEventListener('click', (e) => {
    target = e.target;
    if(target.classList.contains('wbtn')) {
      if(target.innerText == "OPD") {
        target.innerText = "DONE";
        target.style.backgroundColor = "#28a745";
        target.style.color = "white";
      }
    }
  })


  return (
    <div className="col-md-12">
      <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
      <div className="card strpied-tabled-with-hover">
        <div className="card-header ">
          <h4 className="card-title">Patient List</h4>
        </div>
        <div className="card-body table-full-width table-responsive">
          <table className="table table-hover table-striped">
            <thead id='tableHead'>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Emil</th>
                <th>Mobile no.</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                opdPatients?.map((pat) => {
                  return (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{pat.firstName}</td>
                      <td>{pat.lastName}</td>
                      <td>{pat.email}</td>
                      <td>{pat.contactNum}</td>
                      <td>
                        <Link to={`/doctor/prescription/${pat._id}`}><button name="" id="waitbtn" className='btn wbtn btn-warning'>{pat.status}</button></Link>
                        &nbsp;&nbsp;
                        <button onClick={()=>consultOnlie(pat._id)} name="" id="waitbtn" className='btn cbtn wbtn btn-warning'>Cousult Online</button>
                        &nbsp;&nbsp;
                        <button name="" id="waitbtn" className='btn wbtn btn-warning'>IPD</button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
