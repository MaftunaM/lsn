const { Router } = require('express')
const router = Router()
const authMiddleware = require('../middleware/auth')

router.get('/api/cards',authMiddleware, async (req, res) => {
    res.render('cards', {
        title: 'Cards',
        isCard: true
    })
})




module.exports = router