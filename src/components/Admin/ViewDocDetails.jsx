import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ViewDocDetails = () => {

    let id = useParams().id;
    const [docDetail, setdocDetail] = useState({})

    const getDocData = async () => {
        let res = await axios.get('http://localhost:3001/doctor/' + id);
        console.log(res.data.data);
        setdocDetail(res.data.data);
    }

    const printData = () => {
        window.print();
    }

    useEffect(() => {
        getDocData();
    }, [])


    return (
        <div className="container2 c2">
            <div className="container">
                <h1>Doctor details</h1>
                <form action="" className="patientRegistration">
                    <h2 className="pd">Personal Details :-</h2>
                    <div className="row">
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="firstName">First Name: </label>
                            </div>
                            <div className="field">
                                {docDetail?.firstName}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="lastName">Last Name: </label>
                            </div>
                            <div className="field">
                                {docDetail?.lastName}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="titleName">Title Name: </label>
                            </div>
                            <div className="field">
                                {docDetail?.titleName}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="email">Email: </label>
                            </div>
                            <div className="field">
                                {docDetail?.email}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="password">Password: </label>
                            </div>
                            <div className="field">

                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="gender">Gender: </label>
                            </div>
                            <div className="gdr">
                                {docDetail?.gender}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="qualification">Qualification: </label>
                            </div>
                            <div className="field">
                                {docDetail?.qualification}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="specialization">Specialization: </label>
                            </div>
                            <div className="field">
                                {docDetail?.specialization}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="role">Role: </label>
                            </div>
                            <div className="field">
                                Doctor
                            </div>
                        </div>
                    </div>
                    <hr className="seperator" />
                    <h2 className="cd">Contact Details :-</h2>
                    <div className="contactD">
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="contactNum">Contact no1.: </label>
                            </div>
                            <div className="field">
                                {docDetail?.contactNum}
                            </div>
                        </div>
                    </div>
                    <hr className="seperator" />
                    <h2 className="od">Others Details</h2>
                    <div className="row2">
                        <div className="fname">
                            <label htmlFor="activeInd">Active Ind:</label>
                        </div>
                        <div className="field">
                            {docDetail?.activeInd == true ? "Active" : "Inactive"}
                        </div>
                    </div>
                    <div className="row2">
                        <div className="fname">
                            <label htmlFor="joinDate">Join Date:</label>
                        </div>
                        <div className="field">
                            {docDetail?.joinDate}
                        </div>
                    </div>
                    <div className="row2">
                        <div className="fname">
                            <label htmlFor="documentName">Document Type:</label>
                        </div>
                        <div className="field">
                            {docDetail?.documentName}
                        </div>
                    </div>
                    <div className="row2">
                        <div className="fname">
                            <label htmlFor="docType">Uploaded Document</label>
                        </div>
                        <div className="field">
                        </div>
                    </div>
                    <img src={docDetail?.documentPath} className='documentPath' alt="" srcset="" />
                    <div className="remark">
                        <div className="field">
                            <input type="checkbox" name="remark" checked id="remark" readOnly />
                        </div>
                        <div className="fname">
                            Remark : I am a minor and need to be admitted without parent's consent.
                        </div>
                    </div>
                    <div className="submitData">
                        <input type="button" defaultValue="Print" onClick={() => {printData()}} />
                    </div>
                </form>
            </div>
        </div>
    )
}