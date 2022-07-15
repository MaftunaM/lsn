const { Router } = require('express')
const router = Router()

// Get home page
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Home page',
        isHome: true
    })
})

module.exports = router