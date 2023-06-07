import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Read')
        axios.get(`http://localhost:8081/read/` + id)
        .then(res => {
            console.log("Result -> ", res.data);
            setValues({
                ...values,
                name: res.data[0].Name,
                email: res.data[0].Email
            })
        })
        .catch(err => console.log(err))
    }, [])

    const [ values, setValues ] = useState({
        name: '',
        email: ''
    });

    const ChangeHandler = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        })
        console.log(`Name: ${values.name} Email: ${values.email}`)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Values -> ", values);
        axios.put('http://localhost:8081/update/' + id, values)
        .then(res => {
            console.log("Result -> ", res);
            console.log(res.data)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='UpdateForm'>
                <form onSubmit={handleSubmit}>
                    <h2 className='text-center'> Update Student </h2>
                    <div className='mb-2'>
                        <label htmlFor='name'> Name </label>
                        <input type='text' placeholder='Enter Name' className='form-control' name='name' onChange={ChangeHandler} value={values.name} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'> Email </label>
                        <input type='email' placeholder='Enter Email' className='form-control' name='email' onChange={ChangeHandler} value={values.email} />
                    </div>
                    <button className='btn btn-success'> Update </button>
                </form>
            </div>
        </div>
    )
}

export default Update