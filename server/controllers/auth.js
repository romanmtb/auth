const User = require('../models/user')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
const expressJwt = require('express-jwt')
const {OAuth2Client} = require('google-auth-library')
require('dotenv').config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.signUp = (req, res) => {
    const {name, email, password} = req.body

    User.findOne({email}).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }

        const token = jwt.sign({name, email, password}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn: '10m'})

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Account activation link`,
            html: `
                <h1>Please use the following link to activate your account<h1/>
                <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                <hr />
                <p>This email may content sensitive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
        }

        sgMail.send(emailData)
            .then(sent => {
                console.log('SIGNUP EMAIL SENT', sent)
                return res.json({
                    message: `Email has been sent to ${email}. Follow the instructions to activate your account`
                })
            })
            .catch(err => {
                console.log('SIGNUP EMAIL SENT ERROR', err)
                return res.json({
                    message: err.message
                })
            })
    })

}

exports.signIn = (req, res) => {
    const {email, password} = req.body

    User.findOne({email}).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            })
        }

        if (!user.authenticate((password))) {
            return res.status(400).json({
                error: 'Email and password do not match'
            })
        }

        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        const {_id, name, email, role} = user

        return res.json({
            token,
            user: {_id, name, email, role}
        })
    })

}

exports.accountActivation = (req, res) => {
    const {token} = req.body

    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decoded) {
            if (err) {
                console.log('JWT verify account activation error', err)
                return res.status(401).json({
                    error: 'Expired link. Signup again'
                })
            }

            const {name, email, password} = jwt.decode(token)

            const user = new User({name, email, password})

            user.save((err, user) => {
                if (err) {
                    console.log('Save user in account activation error', err)
                    return res.status(401).json({
                        error: 'Error saving uset in db. Try signup again'
                    })
                }
                return res.json({
                    message: 'Signup success. Please signin'
                })
            })
        })
    } else {
        return res.json({
            message: 'Something went wrong. Try again'
        })
    }

}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET
})

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.googleLogin = (req, res) => {
    const {idToken} = req.body

    client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID})
        .then(response => {
            console.log('GOOGLE LOGIN RESPONSE', response)

            const {email_verified, name, email} = response.payload

            if (email_verified) {
                User.findOne({email: email}).exec((error, user) => {

                    if (user) {
                        console.log('USER FROM DB', user)

                        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
                        const {_id, email, name, role} = user
                        return res.json({
                            token,
                            user: {_id, email, name, role}
                        })
                    } else {
                        const password = email + process.env.JWT_SECRET

                        user = new User({name, email, password})
                        user.save((error, data) => {
                            if (error) {
                                console.log('ERROR GOOGLE LOGIN ON USER SAVE', error)
                                return res.status(400).json({
                                    message: 'User signup failed with google'
                                })
                            }

                            const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
                            const {_id, email, name, role} = data
                            return res.json({
                                token,
                                user: {_id, email, name, role}
                            })

                        })
                    }
                })
            } else {
                return res.status(400).json({
                    message: 'Google login failed. Try again'
                })
            }

        })
}


















