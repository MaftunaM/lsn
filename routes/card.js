const { Router } = require('express')
const router = Router()

const Card = require('../model/card')


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

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.removeById(req.params.id)
    if (!card) {
        // demak qanaqadur oshibka bor
        return res.send('Error')
    }

    res.status(200).send(card)
})

module.exports = router