import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {

  const navigate = useNavigate();

  let [roles, setRoles] = useState([]);

  const { register, handleSubmit } = useForm();
  const submitHandler = async (d) => {

    if (d.role != 'admin') {
      let r;

      try {

        if (d.role == 'receptionist') {
          r = d.role;
          d.role = 'employee';
        }

        const res = await axios.post(`http://localhost:3001/${d.role}/login`, d);
        if (res.status === 200) {
          localStorage.setItem('id', res.data.data._id);
          localStorage.setItem('role', d.role);
          console.log(res.data.data);
          switch (d.role) {
            case 'doctor':
              window.location.href = '/doctor/dashboard';
              break;
            case 'patient':
              window.location.href = '/patient/dashboard';
              break;
            case 'employee':
              if (r == 'receptionist') {
                window.location.href = '/receptionist/dashboard';
              }
              break;
            default:
              window.location.href = '/';
              break;
          }
        } else {
          toast.success('Invalide Username or Password.', {
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
      } catch (e) {
        console.log(e);
      }
    } else {
      if (d.email == 'admin@gmail.com' && d.password == 'admin') {
        localStorage.setItem('id', '123456789');
        localStorage.setItem('role', 'admin');
        window.location.href = '/admin/dashboard';
      } else {
        alert('email or password is incorrect.');
      }
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
    <div className='loginform'>
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
      <form action="" onSubmit={handleSubmit(submitHandler)}>
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
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" {...register("email")} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" name='password' id="exampleInputPassword1" placeholder="Password" {...register("password")} />
        </div>
        <div className="form-check fg">
          <Link to="/forgetpassword">Forget Password</Link>
        </div>
        <button type="submit" className="btn btn2 btn-primary">Submit</button>
      </form>
    </div>
  )
}