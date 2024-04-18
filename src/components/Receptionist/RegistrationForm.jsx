import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegistrationForm = () => {

  let navigate = useNavigate();
  let rl, _id;

  const [allRole, setallRole] = useState([])

  const { register, handleSubmit, formState: { errors } } = useForm({});
  const submitHandler = async (data) => {

    try {
      let newObj = Object.assign(data, { address: data.address = data.address + ', ' + data.area });
      delete newObj.area;
      delete newObj.socity;

      newObj['role'] = '65d467b2623744c5ab6f46d9';

      var formData = new FormData();
      formData.append("firstName", newObj?.firstName);
      formData.append("middleName", newObj?.middleName);
      formData.append("lastName", newObj?.lastName);
      formData.append("email", newObj?.email);
      formData.append("password", newObj?.password);
      formData.append("gender", newObj?.gender);
      formData.append("dob", newObj?.dob);
      formData.append("bloodGroup", newObj?.bloodGroup);
      formData.append("role", newObj?.role);
      formData.append("maritalStatus", newObj?.maritalStatus);
      formData.append("address", newObj?.address);
      formData.append("referredBy", newObj?.referredBy);
      formData.append("country", newObj?.country);
      formData.append("state", newObj?.state);
      formData.append("city", newObj?.city);
      formData.append("pincode", newObj?.pincode);
      formData.append("contactNum", newObj?.contactNum);
      formData.append("alternatievNo", newObj?.alternatievNo);
      formData.append("statediseases", newObj?.statediseases);
      formData.append("registrationType", newObj?.registrationType);
      formData.append("docType", newObj?.docType);
      formData.append("statediseases", newObj?.statediseases);
      formData.append("docPath", newObj?.docPath[0]);
      formData.append("status", "Waiting");

      // console.log(newObj?.docPath[0]);

      
      const res = await axios.post('http://localhost:3001/patient', formData);
      console.log(res.data.data);
      const res2 = await axios.post('http://localhost:3001/sendMsg/welcomemsg', res.data.data);
      if (res.status === 201) {
        toast.success('Patient registered successfully.', {
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
        navigate('/receptionist/dashboard');
      }, 2200);
      
    } catch (e) {
      console.log(e);
    }
  }

  let validationSchema = {
    firstName: {
      required: {
        value: true,
        message: 'First name is required'
      }
    },
    lastName: {
      required: {
        value: true,
        message: 'Last name is required'
      }
    },
    email: {
      required: {
        value: true,
        message: 'Email is required'
      },
      pattern: {
        value: /(\w)+@(\w)+.(\w{2,3})/,
        message: 'Invalide email'
      }
    },
    password: {
      required: {
        value: true,
        message: 'Password is required'
      },
      minLength: {
        value: 8,
        message: 'Password must be 8 characters long'
      }
    },
    gender: {
      required: {
        value: true,
        message: 'Please select the gender'
      }
    },
    dob: {
      required: {
        value: true,
        message: 'Date of birth is required'
      }
    },
    bloodGroup: {
      required: {
        value: true,
        message: 'Blood group is required'
      }
    },
    role: {
      required: {
        value: true,
        message: 'Role is required'
      }
    },
    contactNum: {
      required: {
        value: true,
        message: 'Contact number is required'
      }
    }

  }

  const getAlltRole = async () => {
    try {
      const res = await axios.get('http://localhost:3001/role');
      setallRole(res.data.data);

    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAlltRole();
  }, [])

  return (
    <div className="container2">
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
                <label htmlFor="middleName">Middle Name: </label>
              </div>
              <div className="field">
                <input type="text" id="middleName" name="middleName" {...register('middleName')} />
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
                <label htmlFor="dob">DOB: </label>
              </div>
              <div className="field">
                <input type="date" className='reqfield' id="dob" name="dob" {...register('dob', validationSchema.dob)} />
                {errors.dob && <p className="error">{errors.dob.message}</p>}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="bloodGroup">Bool Group: </label>
              </div>
              <div className="field">
                <select name="bloodGroup" className='reqfield' id="bloodGroup" {...register('bloodGroup', validationSchema.bloodGroup)}>
                  <option value="" selected="" disabled="" hidden>
                    Select
                  </option>
                  <option value="a+">A+</option>
                  <option value="a-">A-</option>
                  <option value="b+">B+</option>
                  <option value="b-">B-</option>
                  <option value="o+">O+</option>
                  <option value="o-">O-</option>
                  <option value="ab+">AB+</option>
                  <option value="ab-">AB-</option>
                </select>
                {errors.bloodGroup && <p className="error">{errors.bloodGroup.message}</p>}
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="role">Role: </label>
              </div>
              <div className="field">
                <input type="text" className='reqfield' id="dob" name="role" value='Patient' readOnly />
                {/* <select name="role" className='reqfield' id="role" {...register('role', validationSchema.role)}>
                  <option value="" selected="" disabled="" hidden>
                    Select
                  </option>
                  {
                    allRole?.map((role) => {
                      return (            
                        <option value={role._id}>{role.role}</option>
                      )
                    })
                  }
                </select> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field fname">
                <label htmlFor="maritalStatus">Marital Status:</label>
              </div>
              <div className="field">
                <select name="maritalStatus" id="maritalStatus" {...register('maritalStatus')}>
                  <option value="select" selected="" disabled="">
                    Select
                  </option>
                  <option value="marride">Marride</option>
                  <option value="unmarride">Unmarride</option>
                </select>
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
              <div className="field">
                <input type="text" id="address" name="address" {...register('address')} />
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="area">Area: </label>
              </div>
              <div className="field">
                <input type="text" id="area" name="area" {...register('area')} />
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="city">City: </label>
              </div>
              <div className="field">
                <input type="text" id="city" name="city" {...register('city')} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field fname">
                <label htmlFor="state">State: </label>
              </div>
              <div className="field">
                <input type="text" id="state" name="state" {...register('state')} />
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="country">Country: </label>
              </div>
              <div className="field">
                <input type="text" id="country" name="country" {...register('country')} />
              </div>
            </div>
            <div className="col">
              <div className="field fname">
                <label htmlFor="pincode">Pincode: </label>
              </div>
              <div className="field">
                <input type="text" id="pincode" name="pincode" {...register('pincode')} />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="field fname">
                <label htmlFor="referredBy">Referred By: </label>
              </div>
              <div className="field">
                <input type="text" id="referredBy" name="referredBy" {...register('referredBy')} />
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
            <div className="col" id="contact">
              <div className="field fname">
                <label htmlFor="alternatievNo">Contact no2.: </label>
              </div>
              <div className="field">
                <input type="text" id="alternatievNo" name="alternatievNo" {...register('alternatievNo')} />
              </div>
            </div>
          </div>
          <hr className="seperator" />
          <h2 className="od">Others Details</h2>
          <div className="row2">
            <div className="fname">
              <label htmlFor="diseases">Diseases:</label>
            </div>
            <div className="field">
              <select name="diseases" id="diseases" {...register('diseases')}>
                <option value="select" disabled="" selected="">
                  Select
                </option>
                <option value="Hypertension">Hypertension</option>
                <option value="Diabetis">Diabetis</option>
                <option value="Hypertension+Diabetis">Hypertension + Diabetis</option>
              </select>
            </div>
          </div>
          <div className="row2">
            <div className="fname">
              {" "}
              <label htmlFor="registrationType">Registration Type:</label>
            </div>
            <div className="field">
              <select name="registrationType" id="registrationType" {...register('registrationType')}>
                <option value="select" disabled="" selected="">
                  Select
                </option>
                <option value="private">Private</option>
                <option value="insider">Insider</option>
                <option value="internation">Internation</option>
                <option value="priority">Priority</option>
                <option value="panel">Panel</option>
              </select>
            </div>
          </div>
          <div className="row2">
            <div className="fname">
              <label htmlFor="docType">Document Type:</label>
            </div>
            <div className="field">
              <select name="docType" id="docType" {...register('docType')}>
                <option value="select" disabled="" selected="">
                  Select
                </option>
                <option value="Adhar card">Adhar card</option>
                <option value="Pan card">Pan card</option>
                <option value="voter id">Voter ID</option>
                <option value="driving licence">Driving licence</option>
                <option value="passport">Passport</option>
                <option value="others">Others</option>
              </select>
            </div>
          </div>
          <div className="row2">
            <div className="fname">
              <label htmlFor="docType">Upload Document :</label>
            </div>
            <div className="field">
              <input type="File" name="File" id="file" {...register('docPath')} />
            </div>
          </div>
          <div className="col" id="contact">
            <div className="field fname">
              <label htmlFor="alternatievNo">Status: </label>
            </div>
            <div className="field">
              <input type="text" id="status" name="status" value='Waiting' {...register('status')} />
            </div>
          </div>
          <div className="remark">
            <div className="field">
              <input type="checkbox" name="remark" checked id="remark" {...register('remark')} />
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
