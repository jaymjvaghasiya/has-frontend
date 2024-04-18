import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ViewEmpDetails = () => {

    let id = useParams().id;
    let [empdetail, setempdetail] = useState({});

    const getEmpDetails = async () => {
        try {
            const res = await axios.get('http://localhost:3001/employee/' + id);
            setempdetail(res.data.data);
            // console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const printData = () => {
        window.print();
    }

    useEffect(() => {
        getEmpDetails();
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
                                {empdetail?.firstName}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="lastName">Last Name: </label>
                            </div>
                            <div className="field">
                                {empdetail?.lastName}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="titleName">Title Name: </label>
                            </div>
                            <div className="field">
                                {empdetail?.titleName}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="email">Email: </label>
                            </div>
                            <div className="field">
                                {empdetail?.email}
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
                                {empdetail?.gender}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="qualification">Qualification: </label>
                            </div>
                            <div className="field">
                                {empdetail?.qualification}
                            </div>
                        </div>
                        <div className="col rolename">
                            <div className="field fname">
                                <label htmlFor="role">Role: </label>
                            </div>
                            <div className="field">
                                Receptionist
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
                                {empdetail?.contactNum}
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
                            {empdetail?.activeInd == true ? "Active" : "Inactive"}
                        </div>
                    </div>
                    <div className="row2">
                        <div className="fname">
                            <label htmlFor="joinDate">Join Date:</label>
                        </div>
                        <div className="field">
                            {empdetail?.dateOfJoining}
                        </div>
                    </div>
                    <div className="row2">
                        <div className="fname">
                            <label htmlFor="documentName">Document Type:</label>
                        </div>
                        <div className="field">
                            Adhar Card:
                        </div>
                    </div>
                    <div className="row2">
                        <div className="fname">
                            <label htmlFor="docType">Uploaded Document</label>
                        </div>
                        <div className="field">
                        </div>
                    </div>
                    <img src={empdetail?.aadharCardPath} className='documentPath' alt="" srcset="" />
                    <div className="remark">
                        <div className="field">
                            <input type="checkbox" name="remark" checked id="remark" readOnly />
                        </div>
                        <div className="fname">
                            Remark : I am a minor and need to be admitted without parent's consent.
                        </div>
                    </div>
                    <div className="submitData">
                        <input type="button" defaultValue="Print" onClick={() => { printData() }} />
                    </div>
                </form>
            </div>
        </div>
    )
}
