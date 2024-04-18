import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Paymentwithcard = () => {

    const id = localStorage.getItem('id');

    let { register, handleSubmit, formState: { errors } } = useForm();
    const [patientData, setpatientData] = useState({});

    const navigate = useNavigate();

    const submitHandler = async (data) => {
        let newObj = {
            patient: localStorage.getItem('patient'),
            doctor: localStorage.getItem('doctor'),
            appointmentDate: localStorage.getItem('appointmentDate'),
            appointmentStatus: localStorage.getItem('appointmentStatus')
        }
        try {
            // const result = await axios.post('http://localhost:3001/appointment', newObj);
            // const res = await axios.put(`http://localhost:3001/patient/status/${patientData._id}`, {
            //     ...patientData,
            //     status: 'waiting'
            // })

            const res = await axios.get(`http://localhost:3001/allUsers/payment/${patientData.email}`);
            // console.log(res);
            navigate('/patient/otpforcard');

            // localStorage.removeItem('patient');
            // localStorage.removeItem('doctor');
            // localStorage.removeItem('appointmentDate');
            // localStorage.removeItem('appointmentStatus');

            // if (result.status === 201) {
            //     toast.success('Appointment booked successfully.', {
            //         position: "top-center",
            //         autoClose: 2000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "colored",
            //     });
            // }
            // setTimeout(() => {
            //     navigate('/patient/dashboard');
            // }, 2400);
        } catch (e) {
            console.log(e);
        }
    }

    const getPatientData = async (req, res) => {
        try {
            const result = await axios.get(`http://localhost:3001/patient/getbyid/${id}`);
            console.log(result.data.data);
            setpatientData(result.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPatientData();
    }, [])

    return (
        <div className="book-appointment-form">
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
            <form action="" className="bookAppointment" onSubmit={handleSubmit(submitHandler)}>
                <div className="a-field">
                    <div className="fnm">Card holder name: </div>
                    <input type="text" name="cname" id="" />
                </div>
                <div className="a-field">
                    <div className="fnm">Card number: </div>
                    <input type="text" name="cnum" id="" />
                </div>
                <div className="a-field">
                    <div className="fnm">Exp. Date:</div>
                    <div className="fd">
                        <select name="month" id="">
                            <option value="1">MM</option>
                            <option value="1">01</option>
                            <option value="1">02</option>
                            <option value="1">03</option>
                            <option value="1">04</option>
                            <option value="1">05</option>
                            <option value="1">06</option>
                            <option value="1">07</option>
                            <option value="1">08</option>
                            <option value="1">09</option>
                            <option value="1">10</option>
                            <option value="1">11</option>
                            <option value="1">12</option>
                        </select>
                        <select name="year" id="">
                            <option value="">YY</option>
                            <option value="">25</option>
                            <option value="">26</option>
                            <option value="">27</option>
                            <option value="">28</option>
                            <option value="">29</option>
                            <option value="">30</option>
                            <option value="">31</option>
                            <option value="">32</option>
                        </select>
                    </div>
                </div>
                <div className="a-field">
                    <div className="fnm">CVV:</div>
                    <div className="">
                        <input type="password" name="cvv" />
                    </div>
                </div>

                <div className="submitData">
                    <input type="submit" defaultValue="Submit" />
                </div>
            </form>
        </div>

    )
}
