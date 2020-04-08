import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {authenticate, isAuth} from './helpers'

const Signin = ({history}) => {
    const [values, setValues] = useState({
        email: 'roman.alexeychenko@gmail.com',
        password: 'rrrrrr',
        buttonText: 'Submit'
    })

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({...values, buttonText: 'Submitting'})
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: {email, password}
        })
            .then(response => {
                console.log('SIGNIN SUCCESS', response)

                authenticate(response, () => {
                    setValues({...values, name: '', email: '', password: '', buttonText: 'Submitted'})
                    // toast.success(`Hey ${response.data.user.name}, Welcome back!`)

                    isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
                })
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data)
                setValues({...values, buttonText: 'Submit'})
                toast.error(error.response.data.error)
            })
    }

    const {email, password, buttonText} = values

    const signinForm = () => (
        <form>
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
                {isAuth() && <Redirect to={'/'}/>}
                <h1 className="p-5 text-center">Sign In</h1>
                {signinForm()}
            </div>
        </Layout>
    )
}

export default Signin
