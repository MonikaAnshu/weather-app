const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))

//for dynamic html
app.set('view engine', 'hbs')
app.set('views', viewPath)

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Monika Anshu'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Monika Anshu'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Monika Anshu',
        helpText: 'contact us at monika.a@gaeaglobal.com'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Page Error',
        name: 'Monika Anshu',
        errorMessage: 'Help Article not found'
    })
})
// app.get('/products', (req,res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search key!!'
//         })
//     } else {
//         res.send({
//             products: []
//         })
//     }
// })
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide address!!'
        })
    } else {

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
                
            }
            forecast(latitude, longitude, (error, forcastdata) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forcastdata,
                    location,
                    address: req.query.address
                })


            })
        })
    }
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error page',
        name: 'Monika Anshu',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
}) 