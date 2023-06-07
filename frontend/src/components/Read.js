import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const Read = () => {
    const {id} = useParams();     // will get the id from the url
    const [ student, setStudent ] = useState([])
    
    useEffect(() => {
        console.log('Read')
        axios.get(`http://localhost:8081/read/` + id)
        .then(res => {
            console.log("Result -> ", res.data);
            setStudent(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='FormComp'>
                <div className='p-2 Comp'>
                    <h1 className='text-center'> Student Details </h1>
                    {console.log("Student -> ",student)}
                    <h2 className='spanDiv'> <span className='w-60'> ID: </span> {student.ID} </h2>
                    <h2 className='spanDiv'> <span className='w-40'> Name: </span> {student.Name} </h2>
                    <h2 className='spanDiv'> <span className='w-40'> Email: </span> {student.Email} </h2>
                    <Link to="/" className='btn btn-primary me-2'> Back </Link>
                    <Link to={`/edit/${student.ID}`} className='btn btn-info'> Edit </Link>
                </div>
            </div>
        </div>
    )
}

export default Read