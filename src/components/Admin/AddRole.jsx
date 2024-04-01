import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddRole = () => {

    let navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const submitHandler = async (d) => {
        try {
            const res = await axios.post('http://localhost:3001/role', d);
            if (res.status === 201) {
                toast.success('Role added successfully.', {
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
              setTimeout(() => {
                navigate('/admin/dashboard');
              }, 2200);
        } catch(e) {
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
            console.log(e);
        }
    }

    const validationSchema = {}

    return (
        <div className="container2 c3">
            <div className="container">
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
                <h1></h1>
                <form action="" className="newRole" onSubmit={handleSubmit(submitHandler)}>
                    <h2 className="pd">Add Role</h2>
                    <div className="row">
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="role">Role: </label>
                            </div>
                            <div className="field">
                                <input type="text" className='reqfield' id="role" name="role" {...register('role', validationSchema.role)} />
                                {errors.role && <p className="error">{errors.role.message}</p>}
                            </div>
                        </div>
                    </div>
                  
                    <div className="submitData">
                        <input type="submit" defaultValue="Submit" />
                    </div>
                </form>
            </div>
        </div>
    )

}
