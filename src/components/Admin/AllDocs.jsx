import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AllDocs = () => {

    let index = 0;
    const [Docs, setDocs] = useState([]);

    const getAllDocs = async () => {
        let res = await axios.get('http://localhost:3001/doctor');
        setDocs(res.data.data);
    }

    const deleteDocData = async (id) => {
        let res = await axios.delete('http://localhost:3001/doctor/' + id);
        // console.log(res);
        if (res.status == 200) {
            toast.success('Data deleted successfully.', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            toast.error('Some thing went wrong, please check the details', {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        getAllDocs();
    }

    useEffect(() => {
        getAllDocs();
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
                    <h4 className="card-title">Doctor List</h4>
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
                                Docs?.map((d) => {
                                    return (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{d.firstName}</td>
                                            <td>{d.lastName}</td>
                                            <td>{d.email}</td>
                                            <td>{d.contactNum}</td>
                                            <td>
                                                <Link to={`/admin/viewdetails/${d._id}`} className='btn btn1 btn-success'>View</Link>
                                                &nbsp;&nbsp;
                                                <Link to={`/admin/updatedetails/${d._id}`} className='btn btn2 btn-primary'>Update</Link>
                                                &nbsp;&nbsp;
                                                <button className='btn btn4 btn-danger' onClick={() => deleteDocData(d._id)}>Delete</button>
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
