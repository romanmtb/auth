export const signUp = async (req, res) => {
    try {
        res.json({data: 'You hit signup endpoint'})
    } catch (error) {
        res.status(500).send(error.toString())
    }
}
