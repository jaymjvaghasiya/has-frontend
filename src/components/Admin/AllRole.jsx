import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AllRole = () => {

    let index = 0;
    let [allRoles, setallRoles] = useState([]);

    const getAllRoles = async () => {
        try {
            let res = await axios.get('http://localhost:3001/role');
            setallRoles(res.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    const deleteData = async (id) => {
        try {
            let res = await axios.delete('http://localhost:3001/role/'+id);
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
            getAllRoles();
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllRoles();
    }, []);


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
                    <h4 className="card-title">Role List</h4>
                </div>
                <div className="card-body table-full-width table-responsive">
                    <table className="table table-hover table-striped">
                        <thead id='tableHead'>
                            <tr>
                                <th>ID</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allRoles?.map((r) => {
                                    return (
                                        <tr key={index}>
                                            <td>{++index}</td>
                                            <td>{r.role}</td>
                                            <td>
                                                <Link onClick={() => deleteData(r._id)} className='btn btn4 btn-danger'>Delete</Link>
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
