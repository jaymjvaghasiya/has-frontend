import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AllPats = () => {

    let index = 0;
    let [patients, setpatients] = useState([]);

    const getAllPatient = async () => {
        try {
            const res = await axios.get('http://localhost:3001/patient');
            setpatients(res.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    const deleteData = async (id) => {
        try {
            const res = await axios.delete('http://localhost:3001/patient/' + id);
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
            getAllPatient();
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllPatient();
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
                                                &nbsp;&nbsp;
                                                <Link onClick={() => deleteData(pat._id)} className='btn btn4 btn-danger'>Delete</Link>
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
