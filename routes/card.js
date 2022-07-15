const { Router } = require('express')
const router = Router()

const Card = require('../model/card')

// Get home page
router.get('/', async (req, res) => {
    const { price, items } = await Card.fetch()
    res.render('card', {
        title: 'Shopping card',
        isCard: true,
        total: price,
        items
    })
})

router.post('/add', async (req, res) => {
    const lessons = await Card.add(req.body.id)

    if (!lessons) {
        return res.status(500).send('Server error')
    }

    res.redirect('/card')
})

router.get('/card/delete/:id', async (req, res) => {
    await Lesson.removeById(req.params.id)
    res.redirect('/lessons')
})

module.exports = router