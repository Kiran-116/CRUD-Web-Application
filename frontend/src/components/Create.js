import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Create = () => {
    const [ values, setValues ] = useState({
        name: '',
        email: ''
    })

    const navigate = useNavigate();

        const ChangeHandler = (event) => {
            setValues({
                ...values,
                [event.target.name]: event.target.value,
            })
            console.log(`Name: ${values.name} Email: ${values.email}`)
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            axios.post('/student', values)
            .then(res => {
                console.log(res.data);
                navigate('/');
            })
            .catch(err => console.log(err))
        }

        return (
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3 formWrapper'>
                    <form onSubmit={handleSubmit}>
                        <h2> Add Student </h2>
                        <div className='mb-2'>
                            <label htmlFor='name'> Name </label>
                            <input type='text' placeholder='Enter Name' className='form-control' name='name' onChange={ChangeHandler} required={true}/>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='email'> Email </label>
                            <input type='email' placeholder='Enter Email' className='form-control' name='email' onChange={ChangeHandler} required={true} />
                        </div>
                        <button className='btn btn-success'type='submit'> Submit </button>
                    </form>
                </div>
            </div>
    )
}

export default Create;