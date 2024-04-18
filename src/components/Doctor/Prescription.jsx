import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { HtmlToPdf } from './HtmlToPdf';

export const Prescription = () => {

    const navigate = useNavigate();

    const pdfRef = useRef();

    let fulldata = new Date();
    let date = fulldata.getDate().toString().padStart(2, '0') + ' - ' + (fulldata.getMonth() + 1).toString().padStart(2, '0') + ' - ' + fulldata.getFullYear();
    let index = 0;
    const id = useParams().id;
    let did = localStorage.getItem('id');

    const [details, setdetails] = useState({})
    const [doctor, setdoctor] = useState({})
    const { register, handleSubmit } = useForm({});
    let [email, setemail] = useState("");

    const submitHandler = async (data) => {

        let med1 = [data.drug1, data.frequency1, data.instruction1];
        let med2 = [data.drug2, data.frequency2, data.instruction2];
        let med3 = [data.drug3, data.frequency3, data.instruction3];
        let med4 = [data.drug4, data.frequency4, data.instruction4];
        let med5 = [data.drug5, data.frequency5, data.instruction5];

        let newObj = {
            patientId: details._id,
            patientName: details.firstName + ' ' + details.lastName,
            docId: doctor._id,
            docName: doctor.firstName + ' ' + doctor.lastName,
            m1: med1,
            m2: med2,
            m3: med3,
            m4: med4,
            m5: med5,
            reports: data.reports,
            advice: data.advice,
            date: date
        }

        console.log(newObj);

        const statusData = {
            status: 'OPD Done'
        }

        try {
            // const res = await axios.put('http://localhost:3001/patient/' + details._id, statusData);
            const res1 = await axios.post('http://localhost:3001/prescription', {
                ...newObj,
                email: email
            });

            const res2 = await axios.post('http://localhost:3001/sendMsg/prescription', {
                ...newObj,
                email: email
            });

            const res3 = await axios.put(`http://localhost:3001/patient/status/${id}`, {
                ...details,
                status: "OPD Done"
            });


            toast.success('Prescription uploaded.', {
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
                navigate('/doctor/dashboard');
            }, 2500);
        } catch (e) {
            console.log(e);
        }

    }

    const getPatientDetails = async () => {
        try {
            const res = await axios.get('http://localhost:3001/patient/getbyid/' + id);
            // console.log(res.data.data);
            setdetails(res.data.data);
            setemail(res.data.data.email);
        } catch (e) {
            console.log(e);
        }
    }

    const getDoctor = async () => {
        try {
            const res = await axios.get('http://localhost:3001/doctor/' + did);
            // console.log(res.data.data);
            setdoctor(res.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    const downloadPDF = () => {
        // const input = document.getElementById('opd-container');
        // html2canvas(input)
        //     .then((canvas) => {
        //         const imgData = canvas.toDataURL('image/png');
        //         const pdf = new jsPDF();
        //         pdf.addImage(imgData, 'JPEG', 0, 0);
        //         // pdf.output('dataurlnewwindow');
        //         pdf.save('prescription.pdf');
        //     });
        window.print();
    }

    useEffect(() => {
        getPatientDetails();
        getDoctor();
    }, [])

    let tb = document.querySelector('tbody');

    const addRow = () => {
        index++;
        let newtr = document.createElement('tr');
        let newtd0 = document.createElement('td');
        let newtd1 = document.createElement('td');
        let newtd2 = document.createElement('td');
        let newtd3 = document.createElement('td');

        let in1 = document.createElement('input');
        in1.setAttribute('type', 'text');
        in1.name = "drug";
        in1.register = { ...register('drug') };

        let in2 = document.createElement('input');
        in2.setAttribute('type', 'text');
        in2.name = "frequency";
        in2.register = { ...register('frequency') }

        let in3 = document.createElement('input');
        in3.setAttribute('type', 'text');
        in3.name = "instruction";
        in3.register = { ...register('instruction') }

        newtd0.classList.add('indexno');

        newtd0.textContent = index;
        newtd1.appendChild(in1);
        newtd2.appendChild(in2);
        newtd3.appendChild(in3);

        newtr.appendChild(newtd0);
        newtr.appendChild(newtd1);
        newtr.appendChild(newtd2);
        newtr.appendChild(newtd3);

        tb.appendChild(newtr);
    }

    return (
        <div className="opd-container" id='opd-container' style={{ display: 'block' }} ref={pdfRef}>
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
            <div className="treatment">
                <h2>Prescription</h2>
                <div className="pname">
                    <label>Name: </label>
                    <b><span>{' ' + details.firstName + ' ' + details.lastName}</span></b>
                </div>
                <div className="gender">
                    <label>Gender: </label>
                    <b><span>{' ' + details.gender}</span></b>
                </div>
                <div className="age">
                    <label htmlFor="">Age: </label>
                    <b><span>{' ' + details.age}</span></b>
                </div>

                <div className="doctorName">
                    <label>Doctor Name: </label>
                    <b><span>{' ' + doctor.firstName + ' ' + doctor.lastName}</span></b>
                </div>

                <div className="date">
                    <label>Date: </label>
                    <b>{' ' + date}</b>
                </div>

                <hr className='line' />
                <h4>Treatment</h4>
                <form action="" onSubmit={handleSubmit(submitHandler)}>
                    <table border={0}>
                        <thead>
                            <tr>
                                <th className='tableHead tableHeadsr'>Sr no.</th>
                                <th className='tableHead'>Drug</th>
                                <th className='tableHead'>Frequency</th>
                                <th className='tableHead'>Instruction</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='indexno'>{++index}</td>
                                <td>
                                    <input type="text" name="drug" {...register('drug1')} />
                                </td>
                                <td>
                                    <input type="text" name="frequency" {...register('frequency1')} />
                                </td>
                                <td>
                                    <input type="text" name="instruction" id="instruction" {...register('instruction1')} />
                                </td>
                            </tr>
                            <tr>
                                <td className='indexno'>{++index}</td>
                                <td>
                                    <input type="text" name="drug" {...register('drug2')} />
                                </td>
                                <td>
                                    <input type="text" name="frequency" {...register('frequency2')} />
                                </td>
                                <td>
                                    <input type="text" name="instruction" id="instruction" {...register('instruction2')} />
                                </td>
                            </tr>
                            <tr>
                                <td className='indexno'>{++index}</td>
                                <td>
                                    <input type="text" name="drug" {...register('drug3')} />
                                </td>
                                <td>
                                    <input type="text" name="frequency" {...register('frequency3')} />
                                </td>
                                <td>
                                    <input type="text" name="instruction" id="instruction" {...register('instruction3')} />
                                </td>
                            </tr>
                            <tr>
                                <td className='indexno'>{++index}</td>
                                <td>
                                    <input type="text" name="drug" {...register('drug4')} />
                                </td>
                                <td>
                                    <input type="text" name="frequency" {...register('frequency4')} />
                                </td>
                                <td>
                                    <input type="text" name="instruction" id="instruction" {...register('instruction4')} />
                                </td>
                            </tr>
                            <tr>
                                <td className='indexno'>{++index}</td>
                                <td>
                                    <input type="text" name="drug" {...register('drug5')} />
                                </td>
                                <td>
                                    <input type="text" name="frequency" {...register('frequency5')} />
                                </td>
                                <td>
                                    <input type="text" name="instruction" id="instruction" {...register('instruction5')} />
                                </td>
                            </tr>
                        </tbody>

                    </table>
                    {/* <button className='add-row' onClick={() => addRow()}>
                                Add
                        </button> */}

                    <div className="advice">
                        <h4>Reports:-</h4>
                        <textarea
                            name="advice"
                            id="advice"
                            cols={93}
                            rows={3}
                            defaultValue={""}
                            {...register('reports')}
                        />
                    </div>

                    <div className="advice">
                        <h4>Advice:-</h4>
                        <textarea
                            name="advice"
                            id="advice"
                            cols={93}
                            rows={3}
                            defaultValue={""}
                            {...register('advice')}
                        />
                    </div>
                    <div className="submitData submitPre">
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    )
}
