const express = require('express')
const router = express.Router()
const Joi = require('joi')
const authMiddleware = require('../middleware/auth')

const Lesson = require('../model/lesson')


router.get('/', async (req, res) => {
    const lessons = await Lesson.getAll()


    res.render('lessons', {
        title: 'All lessons',
        lessons,
        areLessons: true
    })
})


router.get('/add', (req, res) => {
    res.render('addLesson', {
        title: 'Add lesson'
    })
})


router.get('/lesson', (req, res) => {
    const lesson = lessons.find(les => les.name === req.query.name)
    res.status(200).send(lesson)
})

router.get('/:id', async (req, res) => {

    const id = req.params.id
    const lesson = await Lesson.findById(id)

    res.render("lesson", {
        title: lesson.name,
        lesson
    })
})


router.get('/delete/:id', authMiddleware, async (req, res) => {
    await Lesson.removeById(req.params.id)
    res.redirect('/lessons')
})


router.post('/add', authMiddleware, async (req, res) => {

    const schema = Joi.object({
        name: Joi.string().
            min(3).
            required(),
        author: Joi.string()
            .required(),
        price: Joi.string()
            .required(),
        year: Joi.number(),
        img: Joi.string()
            .required()
    })

    const value = schema.validate(req.body)

    if (value.error) {
        res.status(404).send(value.error.message)
        return
    }

    const lesson = new Lesson(
        req.body.name,
        req.body.img,
        req.body.year || new Date(),
        req.body.author,
        req.body.price
    )

    await lesson.save()

    res.redirect('/lessons')
})


router.post('/update/', authMiddleware, async (req, res) => {
    const id = req.body.id
    await Lesson.findByIdAndUpdate(id, req.body)
    res.redirect('/lessons')
})

router.get('/update/:id', authMiddleware, async (req, res) => {
    const lesson = await Lesson.findById(req.params.id)
    res.render('updateLesson', {
        lesson,
        title: lesson.name
    })
})

module.exports = router