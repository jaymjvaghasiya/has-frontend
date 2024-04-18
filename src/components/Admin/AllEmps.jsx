import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AllEmps = () => {

  let [emaployees, setemaployees] = useState([]);
  let index = 0;

  const deleteEmpData = async (id) => {
    try {
      let res = await axios.delete('http://localhost:3001/employee/' + id);
      getallemployees();
    } catch (e) {
      console.log(e);
    }
  }

  const getallemployees = async () => {
    try {
      let res = await axios.get('http://localhost:3001/employee');
      setemaployees(res.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getallemployees();
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
          <h4 className="card-title">Employee List</h4>
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
              </tr>
            </thead>
            <tbody>
              {
                emaployees?.map((e) => {
                  return (
                    <tr key={index}>
                      <td>{++index}</td>
                      <td>{e.firstName}</td>
                      <td>{e.lastName}</td>
                      <td>{e.email}</td>
                      <td>{e.contactNum}</td>
                      <td>
                        <Link to={`/admin/viewempdetails/${e._id}`} className='btn btn1 btn-success'>View</Link>
                        &nbsp;&nbsp;
                        <Link to={`/admin/updateempdetails/${e._id}`} className='btn btn2 btn-primary'>Update</Link>
                        &nbsp;&nbsp;
                        <button className='btn btn4 btn-danger' onClick={() => deleteEmpData(e._id)}>Delete</button>
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
