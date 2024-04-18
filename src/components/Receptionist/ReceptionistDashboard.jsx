import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToOpd } from '../../redux/OpdSlice'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ReceptionistDashboard = () => {

  const state = useSelector((state)=>state.opd);
  console.log(state);

  const dispatch = useDispatch();

  let index = 0;
  let [patients, setpatients] = useState([]);

  const [appointment, setAppointment] = useState([]);

  const getAllPatient = async () => {
    try {
      const res = await axios.get('http://localhost:3001/patient');
      setpatients(res.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  const opdPtient = async (data, id) => {
    console.log(data);
    try {
      const res = await axios.put(`http://localhost:3001/patient/status/${id}`, {
        ...data,
        status: "OPD"
      });

      // const res2 = await axios.post("http://localhost:3001/opdpatient", {
      //   ...data,
      //   status: "OPD"
      // });

      if(res.status === 201) {
        toast.success('Patient went to OPD.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      setTimeout(() => {
        getAllPatient();
      }, 2200);
    } catch(e) {
      console.log(e);
    }
  }

  let target;
  window.addEventListener('click', (e) => {
    target = e.target;
    console.log(target);
    if(target.classList.contains('btn3')) {
      if(target.innerText == "Waiting") {
        target.innerText = "OPD";
        target.style.backgroundColor = "#ffc107";
        target.style.color = "black";
      }
    }
  })  



  useEffect(() => {
    getAllPatient();
    let btns = document.getElementsByClassName('btn3');

    for(let i = 0; i < btns.length; i++) {
      if(btns[i].innerText == "Waiting") {
        btns[i].style.backgroundColor = "#dc3545";
      } else if(btns[i].innerText == "OPD Done") {
        btns[i].style.backgroundColor = "#28a745";
      } else {
        btns[i].style.backgroundColor = "#ffc107";
        btns[i].style.color = "black";
      }
    }

  }, [])


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
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                patients?.map((pat) => {
                  return (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{pat.firstName}</td>
                      <td>{pat.lastName}</td>
                      <td>{pat.email}</td>
                      <td>{pat.contactNum}</td>
                      <td>
                        <Link to={`/receptionist/viewdetails/${pat._id}`} className='btn btn1 btn-success'>Profile</Link>
                        &nbsp;&nbsp;
                        <Link to={`/receptionist/updatedetails/${pat._id}`} className='btn btn2 btn-primary'>Update</Link>
                      </td>
                      <td>
                        <button onClick={()=>opdPtient(pat, pat._id)} name="" id="waitbtn" className='btn btn3 btn-secondary'>{pat.status}</button>
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