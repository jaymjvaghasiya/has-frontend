import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Otpforcard = () => {

    const id = localStorage.getItem('id');
    const email = localStorage.getItem('email');
    
    let [otp, setotp] = useState();
    const [patientData, setpatientData] = useState({});
    let navigate = useNavigate();

    let { register, handleSubmit } = useForm({});
    const submitHandler = async (data) => {
        console.log();
        console.log(data.otp);
        console.log(otp);
        let newObj = {
            patient: localStorage.getItem('patient'),
            doctor: localStorage.getItem('doctor'),
            appointmentDate: localStorage.getItem('appointmentDate'),
            appointmentStatus: localStorage.getItem('appointmentStatus')
        }

        if (data.otp == otp) {
    
            const result = await axios.post('http://localhost:3001/appointment', newObj);
            const res = await axios.put(`http://localhost:3001/patient/status/${patientData._id}`, {
                ...patientData,
                status: 'waiting'
            })
            const result2 = await axios.delete(`http://localhost:3001/allUsers/${email}`);

            localStorage.removeItem('patient');
            localStorage.removeItem('doctor');
            localStorage.removeItem('appointmentDate');
            localStorage.removeItem('appointmentStatus');
            localStorage.removeItem('email');

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
            setTimeout(() => {
                navigate('/patient/dashboard')
            }, 2200);
        } else {
            toast.error('OTP does not matched.', {
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
    }

    const getPatientData = async (req, res) => {
        try {
            const result = await axios.get(`http://localhost:3001/patient/getbyid/${id}`);
            setpatientData(result.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    let getOtp = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/allUsers/one/${email}`);
            console.log(res.data.data.otp);
            setotp(res.data.data.otp);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getPatientData();
        getOtp();
    }, [])

    return (
        <div>
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
            <div className='container forgetpassword'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Get OTP</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <div className='form-group'>
                                        <label for='otp'>OTP</label>
                                        <input type='text' name='otp' className='form-control' id='otp' placeholder='Enter OTP' {...register('otp')} />
                                    </div>
                                    <button type='submit' className='btn btn-primary btn2'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
