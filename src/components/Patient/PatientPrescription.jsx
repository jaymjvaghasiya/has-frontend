import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'

export const PatientPrescription = () => {

    const id = useParams().id;
    // console.log(id);

    let index = 0;

    let [d, setd] = useState({});

    const patientPrescriptionData = async (req, res) => {
        try {
            let result = await axios.get(`http://localhost:3001/prescription/getOne/${id}`);
            setd(result.data.data);
            // console.log(d);
            console.log(result.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        patientPrescriptionData();
    }, [])


    return (
        <>
            <Helmet>

                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />
                <link href="../../assets/css/bootstrap.min.css" rel="stylesheet" />
                <link href="../../assets/css/light-bootstrap-dashboard.css?v=2.0.0 " rel="stylesheet" />
                <link href="../../assets/css/demo.css" rel="stylesheet" />
                <link href="../../assets/css/style.css" rel="stylesheet" />
            </Helmet>
            <div className="opd-container" id='opd-container' style={{ display: 'block' }}>
                <div className="treatment">
                    <h2>Prescription</h2>
                    <div className="pname">
                        <label>Name: </label>
                        <b><span>{' ' + d?.patientName}</span></b>
                    </div>
                    <div className="gender">
                        <label>Gender: </label>
                        <b><span>{' ' + d?.patientId?.gender}</span></b>
                    </div>
                    <div className="age">
                        <label htmlFor="">Age: </label>
                        <b><span>{' ' + d?.patientId?.age}</span></b>
                    </div>

                    <div className="doctorName">
                        <label>Doctor Name: </label>
                        <b><span>{' ' + d?.doctorName}</span></b>
                    </div>

                    <div className="date">
                        <label>Date: </label>
                        <b>{' ' + d.date}</b>
                    </div>

                    <hr className='line' />
                    <h4>Treatment</h4>
                    <form>
                        <table border={0} className='tableStyle'>
                            <thead>
                                <tr>
                                    <th className='tableHead tableHeadsr'>Sr no.</th>
                                    <th className='tableHead theadData'>Drug</th>
                                    <th className='tableHead theadData'>Frequency</th>
                                    <th className='tableHead theadData'>Instruction</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    d?.m1 && d?.m1.length > 0 ?

                                        <tr>
                                            <td className='indexno'>{++index}</td>
                                            <td className="medicin">
                                                <span>{d?.m1[0]}</span>
                                            </td>
                                            <td className="medicin">
                                                <span>{d?.m1[1]}</span>
                                            </td>
                                            <td className="medicin">
                                                <span>{d?.m1[2]}</span>
                                            </td>
                                        </tr>
                                        : null
                                }
                                {
                                    d?.m2 && d?.m2.length > 0 ?

                                        <tr>
                                            <td className='indexno'>{++index}</td>
                                            <td className="medicin">
                                                <span>{d?.m2[0]}</span>
                                            </td>
                                            <td className="medicin">
                                                <span>{d?.m2[1]}</span>
                                            </td>
                                            <td className="medicin">
                                                <span>{d?.m2[2]}</span>
                                            </td>
                                        </tr>
                                        : null
                                }
                                {
                                    d?.m3 && d?.m3.length > 0 ?

                                        <tr>
                                            <td className='indexno'>{++index}</td>
                                            <td className="medicin">
                                                <span>{d?.m3[0]}</span>
                                            </td>
                                            <td className="medicin">
                                                <span>{d?.m3[1]}</span>
                                            </td>
                                            <td className="medicin">
                                                <span>{d?.m3[2]}</span>
                                            </td>
                                        </tr>
                                        : null
                                }
                                {
                                    d?.m4 && d?.m4.length > 0 ?

                                        <tr>
                                            <td className='indexno'>{++index}</td>
                                            <td className="medicin">
                                                <span>{d?.m4[0]}</span>
                                            </td>
                                            <td className="medicin">
                                                <span>{d?.m4[1]}</span>
                                            </td>
                                            <td className="medicin">
                                                <span>{d?.m4[2]}</span>
                                            </td>
                                        </tr>
                                        : null
                                }
                                {
                                    d?.m5 && d?.m5.length > 0 ?

                                        <tr>
                                            <td className='indexno'>{++index}</td>
                                            <td className="medicin">
                                                <span>{d?.m5[0]}</span>
                                            </td>
                                            <td className="medicin">
                                                <span>{d?.m5[1]}</span>
                                            </td>
                                            <td className="medicin">
                                                <span>{d?.m5[2]}</span>
                                            </td>
                                        </tr>
                                        : null
                                }

                            </tbody>

                        </table>

                        <div className="advice">
                            <h4>Reports:-</h4>
                            <div className='ar'>{d?.reports}</div>
                        </div>

                        <div className="advice">
                            <h4>Advice:-</h4>
                            <div className='ar'>{d?.advice}</div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
