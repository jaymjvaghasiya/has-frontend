import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ViewDeyails = () => {

    const id = useParams().id;
    const [details, setdetails] = useState({});
    const getData = async () => {
        try {
            const res = await axios.get('http://localhost:3001/patient/getbyid/' + id);
            setdetails(res.data.data);
            console.log(res.data.data);
        } catch(e) {
            console.log(e);
        }
    }

    const downloadPDF = () => {
      window.print();
    }

    useEffect(() => {
      getData();
    }, [])
    

  return (
    <div className="container2">
      <h1>Patient: {details.firstName}</h1>
        <form action="" className="patientRegistration">
          <h2 className="pd">Personal Details :-</h2>
          <div className="row">
            <div className="col">
              <div className="field fname">
                <label htmlFor="firstName">First Name: </label>
              </div>
              <div className="field detailField">
                {details.firstName}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="middleName">Middle Name: </label>
              </div>
              <div className="field detailField">
              {details.middleName}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="lastName">Last Name: </label>
              </div>
              <div className="field detailField">
                {details.lastName}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field fname">
                <label htmlFor="email">Email: </label>
              </div>
              <div className="field detailField">
                {details.email}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="password">Password: </label>
              </div>
              <div className="field detailField">
                {/* {details.password} */}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="gender">Gender: </label>
              </div>
              <div className="gdr detailField">
                {details.gender}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field fname">
                <label htmlFor="dob">DOB: </label>
              </div>
              <div className="field detailField">
                {details.dob}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="bloodGroup">Bool Group: </label>
              </div>
              <div className="field detailField">
                {details.bloodGroup}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="role">Role: </label>
              </div>
              <div className="field detailField">
                {details.role?.role}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field fname">
                <label htmlFor="maritalStatus">Marital Status:</label>
              </div>
              <div className="field detailField">
                {details.maritalStatus}
              </div>
            </div>
          </div>
          <hr className="seperator" />
          <h2 className="ad">Address Details :-</h2>
          <div className="row">
            <div className="col">
              <div className="field fname">
                <label htmlFor="address">Socity: </label>
              </div>
              <div className="field detailField">
                {details.address}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="area">Area: </label>
              </div>
              <div className="field detailField">
                {details.address}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="city">City: </label>
              </div>
              <div className="field detailField">
                {details.city}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field fname">
                <label htmlFor="state">State: </label>
              </div>
              <div className="field detailField">
                {details.state}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="country">Country: </label>
              </div>
              <div className="field detailField">
                {details.country}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="pincode">Pincode: </label>
              </div>
              <div className="field detailField">
                {details.pincode}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field fname">
                <label htmlFor="referredBy">Referred By: </label>
              </div>
              <div className="field detailField">
                {details.referredBy}
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
              <div className="field detailField">
                {details.contactNum}
              </div>
            </div>
            <div className="col" id="contact">
              <div className="field fname">
                <label htmlFor="alternatievNo">Contact no2.: </label>
              </div>
              <div className="field detailField">
                {details.alternatievNo}
              </div>
            </div>
          </div>
          <hr className="seperator" />
          <h2 className="od">Others Details</h2>
          <div className="row2">
            <div className="fname">
              <label htmlFor="diseases">Diseases:</label>
            </div>
            <div className="field detailField">
              {details.diseases}
            </div>
          </div>
          <div className="row2">
            <div className="fname">
              {" "}
              <label htmlFor="registrationType">Registration Type:</label>
            </div>
            <div className="field detailField">
              {details.registrationType}
            </div>
          </div>
          <div className="row2">
            <div className="fname">
              <label htmlFor="docType">Document Type:</label>
            </div>
            <div className="field detailField">
              {details.docType}
            </div>
          </div>
          <div className="row2">
            <div className="fname">
              <label htmlFor="docType">Document:</label>
            </div>
            <div className="field detailField">
            </div>
          </div>
          <img src={details?.docPath} className='documentPath' alt="" srcset="" />
          <div className="submitData">
            <input type="button" onClick={() => downloadPDF()} defaultValue="Print" />
          </div>
        </form>
      </div>

  )
}