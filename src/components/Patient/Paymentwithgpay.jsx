import React from 'react'
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Paymentwithgpay = () => {

    let { register, handleSubmit, formState: { errors } } = useForm();

    const submitHandler = async (data) => {

    }

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
                
                <div className="form-group">
                    <img src="D:/projects/ehms/frontend2/public/assets/img/gpay.jpg" alt="" />
                </div>

                <div className="submitData">
                    <input type="submit" defaultValue="Submit" />
                </div>
            </form>
    </div>
  )
}
