import React, {useState, useEffect} from 'react'
import jwt from 'jsonwebtoken'
import Layout from '../core/Layout'
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Activate = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        token: '',
        isShow: true,
    })

    useEffect(() => {
        console.log('COMPONENT IS MOUNT')

        const token = match.params.token
        const {name} = jwt.decode(token)

        if (token) {
            setValues({...values, name, token})
        }

    }, [])

    const clickSubmit = event => {
        event.preventDefault()
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/account-activation`,
            data: {token}
        })
            .then(response => {
                console.log('ACCOUNT ACTIVATE SUCCESS', response)

                setValues({...values, isShow: false})
                toast.success(response.data.message)
            })
            .catch(error => {
                console.log('ACCOUNT ACTIVATE ERROR', error.response.data.error)

                toast.error(error.response.data.error)
            })
    }

    const activationLink = () => (
        <div className="text-center">
            <h1 className="p-5">Hey {name}, Ready to activate your account ?</h1>
            <button className="btn btn-outline-primary" onClick={clickSubmit}>
                Activate Account
            </button>
        </div>
    )

    const {name, token, isShow} = values

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
                <ToastContainer />
                {activationLink()}
            </div>
        </Layout>
    )
}

export default Activate
