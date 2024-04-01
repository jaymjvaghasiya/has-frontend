import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddDoctor = () => {

    let navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({});
    const submitHandler = async (d) => {

        var formData = new FormData();

        formData.append('firstName', d?.firstName);
        formData.append('lastName', d?.lastName);
        formData.append('titleName', d?.titleName);
        formData.append('email', d?.email);
        formData.append('password', d?.password);
        formData.append('gender', d?.gender);
        formData.append('qualification', d?.qualification);
        formData.append('specialization', d?.specialization);
        formData.append('role', '65c9d2b35740b1ab9f7e6101');
        formData.append('contactNum', d?.contactNum);
        formData.append('activeInd', d?.activeInd);
        formData.append('joinDate', d?.joinDate);
        formData.append('documentName', d?.documentName);
        formData.append('documentPath', d?.documentPath[0]);

        const res = await axios.post('http://localhost:3001/doctor', formData);
        if (res.status === 201) {
            toast.success('Doctor registered successfully.', {
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
    }

    let validationSchema = {};

    return (
        <div className="container2 c2">
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
                <h1>Registration Form</h1>
                <form action="" className="patientRegistration" onSubmit={handleSubmit(submitHandler)}>
                    <h2 className="pd">Personal Details :-</h2>
                    <div className="row">
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="firstName">First Name: </label>
                            </div>
                            <div className="field">
                                <input type="text" className='reqfield' id="firstName" name="firstName" {...register('firstName', validationSchema.firstName)} />
                                {errors.firstName && <p className="error">{errors.firstName.message}</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="lastName">Last Name: </label>
                            </div>
                            <div className="field">
                                <input type="text" className='reqfield' id="lastName" name="lastName" {...register('lastName', validationSchema.lastName)} />
                                {errors.lastName && <p className="error">{errors.lastName.message}</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="titleName">Title Name: </label>
                            </div>
                            <div className="field">
                                <input type="text" id="titleName" name="titleName" {...register('titleName')} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="email">Email: </label>
                            </div>
                            <div className="field">
                                <input type="text" className='reqfield' id="email" name="email" {...register('email', validationSchema.email)} />
                                {errors.email && <p className="error">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="password">Password: </label>
                            </div>
                            <div className="field">
                                <input type="password" className='reqfield' id="password" name="password" {...register('password', validationSchema.password)} />
                                {errors.password && <p className="error">{errors.password.message}</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="gender">Gender: </label>
                            </div>
                            <div className="gdr">
                                <div className="field gf">
                                    <input type="radio" defaultValue="male" id='male' name="gender" {...register('gender', validationSchema.gender)} />
                                </div>
                                <label className="gnm" htmlFor='male'>MALE</label>
                                <div className="field">
                                    <input type="radio" defaultValue="female" id='female' name="gender"  {...register('gender', validationSchema.gender)} />
                                </div>
                                <label className="gnm" htmlFor='female'>FEMALE</label>
                                {errors.gender && <p className='error gdrerr'>{errors.gender.message}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="qualification">Qualification: </label>
                            </div>
                            <div className="field">
                                <select name="qualification" className='reqfield' id="qualification" {...register('qualification', validationSchema.qualification)}>
                                    <option value="" selected="" disabled="" hidden>
                                        Select
                                    </option>
                                    <option value="mbbs">MBBS</option>
                                    <option value="do">DO</option>
                                    <option value="md">MD</option>
                                    <option value="dds">DDS</option>
                                    <option value="dvm">DVM</option>
                                    <option value="pharmD">PharmD</option>
                                    <option value="dc">DC</option>
                                </select>
                                {errors.qualification && <p className="error">{errors.qualification.message}</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="specialization">Specialization: </label>
                            </div>
                            <div className="field">
                                <select name="specialization" className='reqfield' id="specialization" {...register('specialization', validationSchema.specialization)}>
                                    <option value="" selected="" disabled="" hidden>
                                        Select
                                    </option>
                                    <option value="Internal Medicine">Internal Medicine</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="Surgery">Surgery</option>
                                    <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                                    <option value="Anesthesiology">Anesthesiology</option>
                                    <option value="Psychiatry">Psychiatry</option>
                                    <option value="Radiology">Radiology</option>
                                </select>
                                {errors.specialization && <p className="error">{errors.specialization.message}</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="field fname">
                                <label htmlFor="role">Role: </label>
                            </div>
                            <div className="field">
                                <input type="text" className='reqfield' id="role" name="role" value='Doctor' readOnly />
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
                                <input type="text" className='reqfield' id="contactNum" name="contactNum" {...register('contactNum', validationSchema.contactNum)} />
                                {errors.contactNum && <p className='error'>{errors.contactNum.message}</p>}
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
                            <select name="activeInd" id="activeInd" {...register('activeInd')}>
                                <option value="select" disabled="" selected="">
                                    Select
                                </option>
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                        </div>
                    </div>
                    <div className="row2">
                        <div className="fname">
                            {" "}
                            <label htmlFor="joinDate">Join Date:</label>
                        </div>
                        <div className="field">
                            <input type="date" className='reqfield' id="joinDate" name="joinDate" {...register('joinDate', validationSchema.joinDate)} />
                            {errors.joinDate && <p className="error">{errors.joinDate.message}</p>}
                        </div>
                    </div>
                    <div className="row2">
                        <div className="fname">
                            <label htmlFor="documentName">Document Type:</label>
                        </div>
                        <div className="field">
                            <select name="documentName" id="documentName" {...register('documentName')}>
                                <option value="select" disabled="" selected="">
                                    Select
                                </option>
                                <option value="Medical License">Medical License</option>
                                <option value="Board Certification">Board Certification</option>
                                <option value="Hospital Privileges">Hospital Privileges</option>
                                <option value="Training Certificates">Training Certificates</option>
                                <option value="Professional References">Professional References</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>
                    <div className="row2">
                        <div className="fname">
                            <label htmlFor="docType">Upload Document :</label>
                        </div>
                        <div className="field">
                            <input type="File" name="File" id="file" {...register('documentPath')} />
                        </div>
                    </div>
                    <span className='io'>image only</span>
                    <div className="remark">
                        <div className="field">
                            <input type="checkbox" name="remark" checked id="remark" />
                        </div>
                        <div className="fname">
                            Remark : I am a minor and need to be admitted without parent's consent.
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
