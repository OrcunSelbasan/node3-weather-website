const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

/* console.log(__dirname)
console.log(path.join(__dirname, '../public')) */

const app = express()



// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
 
app.get('', (req,res) => {
    res.render('index' , {
        title: 'Weather',
        name: 'Orcun Selbasan',
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Orcun Selbasan'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        title: 'Help',
        helpMsg: 'You can reach us via email. \n example@mail.com',
        name: 'Orcun Selbasan',
    })
})

app.get ('/weather', (req,res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,

            })
        })
    })
   /*  res.send({
        forecast: 'Sunny',
        location: 'Philadelphia',
        addres: req.query.address,
    }) */
})


app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    res.send({
        products: [],
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Orcun Selbasan',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Orcun Selbasan',
        errorMessage: 'Page not found',
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})