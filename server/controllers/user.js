const User = require('../models/user')

exports.read = (req, res) => {
    const userId = req.params.id

    User.findById(userId).exec((err, user) => {

        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }

        user.salt = undefined
        user.hashed_password = undefined
        res.json({user})
    })
}

exports.update = (req, res) => {
    console.log('UPDATE USER req.user', req.user, 'UPDATE DATA', req.body)

    const {name} = req.body

    User.findOne({_id: req.user._id}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            })
        }

        console.log('NAME', name, '---')

        user.name = name

        user.save((err, updatedUser) => {
            if (err) {
                return res.status(400).json({
                    error: 'User update failed'
                })
            }

            updatedUser.hashed_password = undefined
            updatedUser.salt =undefined

            console.log('UPDATED USER', updatedUser)
            res.json(updatedUser)
        })
    })
}
