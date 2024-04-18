import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BookAppointment = () => {

    const id = localStorage.getItem('id');

    const [patientData, setpatientData] = useState({});
    const [docData, setdocData] = useState([]);

    let { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const submitHandler = async (data) => {
        let newObj = {
            patient: id,
            doctor: data.doctor,
            appointmentDate: data.appointmentDate,
            appointmentStatus: 'waiting'
        }
        console.log(newObj);

        localStorage.setItem('patient', id);
        localStorage.setItem('doctor', data.doctor);
        localStorage.setItem('appointmentDate', data.appointmentDate);
        localStorage.setItem('appointmentStatus', 'waiting');
        localStorage.setItem('email', patientData.email);

        try {

            if (data.payment === 'card') {
                navigate('/patient/paymentwithcard');
            } else {
                const result = await axios.post('http://localhost:3001/appointment', newObj);
                const res = await axios.put(`http://localhost:3001/patient/status/${patientData._id}`, {
                    ...patientData,
                    status: 'waiting'
                })

                const res2 = await axios.post('http://localhost:3001/sendMsg/appointment', newObj);

                localStorage.removeItem('patient');
                localStorage.removeItem('doctor');
                localStorage.removeItem('appointmentDate');
                localStorage.removeItem('appointmentStatus');
                localStorage.removeItem('email');

                if (result.status === 201) {
                    toast.success('Appointment booked successfully.', {
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
                    navigate('/patient/dashboard');
                }, 2400);
            }

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

    const getAllDoc = async (req, res) => {
        try {
            const result = await axios.get('http://localhost:3001/doctor');
            console.log(result.data.data);
            setdocData(result.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPatientData();
        getAllDoc();
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
                    <div className="fnm">Patient Name: </div>
                    <div className="fd"><b>{patientData.firstName + ' ' + patientData.lastName}</b></div>
                </div>
                <div className="a-field">
                    <div className="fnm">Doctor Name:</div>
                    <div className="fd">
                        <select name="doctor" id="" className="sfd" {...register('doctor')}>
                            <option value="">Select Doctor</option>
                            {
                                docData?.map((doc) => {
                                    return (
                                        <option value={doc._id}>{doc.firstName + ' ' + doc.lastName}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="a-field">
                    <div className="fnm">Date:</div>
                    <div className="fd">
                        <input type="date" name="date" id="" {...register('appointmentDate')} />
                    </div>
                </div>
                <div className="a-field">
                    <div className="fnm">Amount:</div>
                    <div className="fd">
                        <input type="text" name="date" value='300' id="" {...register('amount')} readOnly />
                    </div>
                </div>
                <div className="a-field">
                    <div className="fnm">Payment:</div>
                    <div className="fd">
                        <select name="payment" id="" className="sfd" {...register('payment')}>
                            <option value="cash" selected>Select payment mode</option>
                            <option value="cash">Cash</option>
                            <option value="card">Card</option>
                        </select>
                    </div>
                </div>

                <div className="submitData">
                    <input type="submit" defaultValue="Submit" />
                </div>
            </form>
        </div>

    )
}
