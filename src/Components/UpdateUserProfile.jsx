import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'

export const UpdateUserProfile = () => {
    const {id} = useParams();
    const [values, setValues] = useState({
           id: id,
           FName: '',
           MName: '',
           LName: '',
    })
    useEffect(() => {
       axios.put('https://timesheet-api-main.onrender.com/user/account/personal-information/name'+id)
       .then(res => {
        setValues({...values, FName: res.data.FName,  MName: res.data.MName,  LName: res.data.LName})
       })
       .catch(err => console.log(err))
    }, [])
    return(
        <div className="d-flex w-100 justify-content-center  align-items-center">
          <div className="w-50 border bg-secondary text-white p-5">
            <form>
                <div>
                    <label htmlFor="fname">First name</label>
                    <input type="text" name="fname" className="form-control" placeholder="Enter first  name" values={values.FName}/>
                </div><br />
                <div>
                    <label htmlFor="mname">Middle name</label>
                    <input type="text" name="mname" className="form-control" placeholder="Enter middle name" values={values.MName}/>
                </div><br />
                <div>
                    <label htmlFor="lname">Last name</label>
                    <input type="text" name="lname" className="form-control" placeholder="Enter last name" values={values.LName}/>
                </div><br />
            </form>
            <button className="btn btn-info">Update</button>
            </div> 
        </div>
    )
}

