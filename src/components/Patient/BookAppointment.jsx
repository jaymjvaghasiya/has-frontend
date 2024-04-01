import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const BookAppointment = () => {

    const id = localStorage.getItem('id');

    const [patientData, setpatientData] = useState({});
    const [docData, setdocData] = useState([]);

    let { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const submitHandler = async(data) => {
        console.log(data);
        let newObj = {
            patient: id,
            doctor: data.doctor,
            appointmentDate: data.appointmentDate,
            appointmentStatus: 'waiting'
        }
        console.log(newObj);
        
        try {

            const result = await axios.post('http://localhost:3001/appointment', newObj);
            const res1 = await axios.get('http://localhost:3001/patient/getbyid/' + newObj.patient);
            console.log(res1.data.data);
            const res = await axios.put(`http://localhost:3001/patient/${newObj.patient}`, {
                ...res1.data.data,
                status: 'waiting'
            })

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
        } catch(e) {
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

                <div className="submitData">
                    <input type="submit" defaultValue="Submit" />
                </div>
            </form>
        </div>

    )
}
