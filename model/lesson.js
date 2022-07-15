const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')

class Lesson {
    constructor(name, img, year, author, price) {
        this.name = name
        this.img = img
        this.year = year
        this.author = author
        this.price = price
    }

    toJSON() {
        return {
            name: this.name,
            img: this.img,
            year: this.year,
            author: this.author,
            price: this.price,
            id: uuid()
        }
    }

    static async getAll() {
        return new Promise((res, rej) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'db.json'),
                (err, data) => {
                    if (err) rej(err);
                    res(JSON.parse(data))
                })
        })
    }

    async save() {
        const lessons = await Lesson.getAll() // [1,2]
        const lesson = this.toJSON()

        lessons.push(lesson)

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'db.json'),
                JSON.stringify(lessons),
                (err) => {
                    if (err) rej(err)
                    res()
                })
        })
    }

    static async findById(id) {
        const lessons = await Lesson.getAll()

        return new Promise((res, rej) => {
            const lesson = lessons.find((content) => content.id === id)

            if (!lesson) {
                rej('Id not found')
                return
            }

            res(lesson)
        })



    }

    static async removeById(id) {
        try {
            const lessons = await Lesson.getAll()
            const idx = lessons.findIndex(lsn => lsn.id === id)

            if (idx < 0) {
                return new Error('Id not found')
            }

            lessons.splice(idx, 1)

            return new Promise((res, rej) => {
                fs.writeFile(
                    path.join(__dirname, '..', 'data', 'db.json'),
                    JSON.stringify(lessons),
                    (err) => {
                        if (err) rej(err)
                        res()
                    })
            })
        } catch (error) {
            if (error) console.log(error);
        }
    }


    static async findByIdAndUpdate(id, lesson) {
        // getAll data
        const lessons = await Lesson.getAll()
        // eski obj ni qidiramiz //
        const idx = lessons.findIndex((lsn) => lsn.id === id)
        if (idx < 0) {
            // idx ni topolsak demak bu dars bazada bor // u yo'q
            return console.log('Id is not found');
        }
        //  massivni idx bilan yangilab qo'yamiz 
        lessons[idx] = lesson

        return new Promise((res, rej) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'db.json'),
                JSON.stringify(lessons),
                (err) => {
                    if (err) rej(err)
                    res()
                })
        })
    }
}

module.exports = Lesson