import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {ToastContainer, toas} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Signup = () => {
    const [values, setValues] = useState({
        name: 'Roman',
        email: 'roman.alexeychenko@gmail.com',
        password: 'rrrrrr',
        buttonText: 'Submit'
    })

    const handleChange = name => event => {

    }

    const clickSubmit = event => {

    }

    const {name, email, password, buttonText} = values

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control"/>
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control"/>
            </div>

            <div>
                <button onClick={clickSubmit} className="btn btn-primary">
                    {buttonText}
                </button>
            </div>
        </form>
    )

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                <h1 className="p-5 text-center">Signup</h1>
                {signupForm()}
            </div>
        </Layout>
    )
}

export default Signup
