import axios from 'axios'
import React, { useEffect } from 'react'

export const DoctorAppoints = () => {


  const getAllAppoints = async (req, res) => {
    try {
      const res = await axios.get('http://localhost:3001/appointment');
      console.log(res.data.data);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllAppoints();
  }, [])
  

  return (
    <div>DoctorAppoints</div>
  )
}
