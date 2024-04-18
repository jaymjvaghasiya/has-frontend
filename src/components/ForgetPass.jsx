import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';


export const ForgetPass = () => {

    let { register, handleSubmit } = useForm({});
    let navigate = useNavigate();

    let [ roles, setRoles ] = useState([]);

    const submitHandler = async (data) => {
        console.log(data);
        const res = await axios.get(`http://localhost:3001/allUsers/${data.email}`);
        if (res.status == 200) {
            localStorage.setItem('email', data.email);
            localStorage.setItem('role', data.role);
            navigate('/getotp');
        }
    }

    const getAllRole = async () => {
        const res = await axios.get('http://localhost:3001/role');
        setRoles(res.data.data);
    }


    useEffect(() => {
        getAllRole();
    }, [])

    return (
        <div>
            <div className='container forgetpassword'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Forget Password</h4>
                            </div>
                            <div className='card-body'>
                                <form onSubmit={handleSubmit(submitHandler)}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Role</label>
                                        <select className="form-control" {...register('role')}>
                                            <option value="select" selected disabled hidden>Select</option>
                                            {
                                                roles?.map((r) => {
                                                    return (
                                                        <option value={r.role}>{r.role}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group'>
                                        <label for='email'>Email</label>
                                        <input type='email' className='form-control' id='email' placeholder='Enter email' {...register('email')} />
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
