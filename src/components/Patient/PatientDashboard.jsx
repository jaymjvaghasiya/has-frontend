import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export const PatientDashboard = () => {

  let index = 0;
  const pid = localStorage.getItem('id');

  let [data, setdata] = useState([])

  const patientPrescriptionData = async (req, res) => {
    try {
      let result = await axios.get(`http://localhost:3001/prescription/${pid}`);
      setdata(result.data.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    patientPrescriptionData();
  }, [])


  return (
    <>
      <Helmet>

        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
        <link href="../../assets/css/bootstrap.min.css" rel="stylesheet" />
        <link href="../../assets/css/light-bootstrap-dashboard.css?v=2.0.0 " rel="stylesheet" />
        <link href="../../assets/css/demo.css" rel="stylesheet" />
        <link href="../../assets/css/style.css" rel="stylesheet" />
      </Helmet>

      <div className="col-md-12">
        <div className="card strpied-tabled-with-hover">
          <div className="card-header ">
            <h4 className="card-title">Prescription List</h4>
          </div>
          <div className="card-body table-full-width table-responsive">
            <table className="table table-hover table-striped">
              <thead id='tableHead'>
                <tr>
                  <th>ID</th>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>All Prescription</th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.map((d) => {
                    return (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{d.patientId.firstName + ' ' + d.patientId.lastName}</td>
                        <td>{d.date}</td>
                        <td>
                          <Link to={`/patient/prescription/${d._id}`} className='btn btn1 btn-success'>View</Link>
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
    </>
  )
}
