export const signUp = async (req, res) => {
    console.log('REQ BODY ON SIGNUP', req.body)

    try {
        res.json({data: 'You hit signup endpoint'})
    } catch (error) {
        res.status(500).send(error.toString())
    }
}
