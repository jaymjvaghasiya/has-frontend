import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GetOtp = () => {

    let email = localStorage.getItem('email');
    const [otp, setotp] = useState()
    let navigate = useNavigate();

    let { register, handleSubmit } = useForm({});
    const submitHandler = async (data) => {
        console.log(data);
        if (data.otp == otp) {
            toast.success('OTP matched.', {
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
                navigate('/updatePass')
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

    let getData = async () => {
        try {
            let res = await axios.get(`http://localhost:3001/allUsers/one/${email}`);
            setotp(res.data.data.otp);
            console.log(otp);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
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
