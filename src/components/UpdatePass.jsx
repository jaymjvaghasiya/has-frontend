import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdatePass = () => {

    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    let navigate = useNavigate();

    let { register, handleSubmit } = useForm({});
    const submitHandler = async (data) => {
        data['role'] = role;
        if (data.pass != data.repass || data.pass == null || data.repass == null) {
            toast.warning('Passsword does not matched.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            const res1 = await axios.put(`http://localhost:3001/allUsers/${email}`, data);
            localStorage.removeItem('email');
            localStorage.removeItem('role');
            if (res1.status == 200) {
                toast.success('Password updated successfully.', {
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
                    navigate('/')
                }, 2200);
            }
        }
    }

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
                                <h4>Update Password</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <div className='form-group'>
                                        <label for='password'>Password</label>
                                        <input type='password' name='pass' className='form-control' id='password' placeholder='Enter password' {...register('pass')} />
                                    </div>
                                    <div className='form-group'>
                                        <label for='cpassword'>Confirm Password</label>
                                        <input type='password' name='repass' className='form-control' id='cpassword' placeholder='Enter confirm password' {...register('repass')} />
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
