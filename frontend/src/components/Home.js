import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {
    const [ data, setData ] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8081/delete/` + id)
        .then(res => {
            window.location.reload();
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='List-Container'>
                <h2> Student List </h2>
                <div className='d-flex justify-content-end'>
                    <Link to='/create' className='btn btn-sm btn-success'> Create + </Link>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((student, index) => {
                            return (
                                <tr key={index}>
                                    <td> {student.ID} </td>
                                    <td> {student.Name} </td>
                                    <td> {student.Email} </td>
                                    <td>
                                        <Link to={`/read/${student.ID}`} className='btn btn-sm btn-info m-1'> <span className='Btn-home'> Read </span> </Link>
                                        <Link to={`/edit/${student.ID}`} className='btn btn-sm btn-primary mx-2 m-1'> <span className='Btn-home'> Edit </span> </Link>
                                        <button onClick={() => handleDelete(student.ID)} className='btn btn-sm btn-danger m-1'> <span className='Btn-home'> Delete </span> </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home