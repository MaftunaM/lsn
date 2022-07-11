function auth(req, res, next) {
    const auth = true
    if (!auth) {
        res.send('Auth not true')
        return
    }

    console.log('Auth true');
    next()
}

module.exports = auth