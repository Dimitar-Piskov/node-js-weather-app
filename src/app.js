const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const weatherstack = require('./utils/weatherstack')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partial-views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dimitar Piskov'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather App',
        name: 'Dimitar Piskov'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'The Weather App',
        name: 'Dimitar Piskov',
        helpText: 'Sample help text '
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.render('404', {
            title: 'No address',
            errorMessage: 'Must provide address',
            name: 'Dimitar Piskov'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error)
        {
            res.send({error})
        }
        else{
        weatherstack(latitude, longitude, location, (error, {weatherDescription, currentTemperature, chanceToRain, feelsLike} = {}) => {

            if(error)
            {
                res.send({error})
            }
            else{
            res.send({
                title: location,
                weatherDescription: weatherDescription,
                currentTemperature: currentTemperature,
                chanceToRain: chanceToRain,
                feelsLike: feelsLike,
                name: 'Dimitar Piskov'
            })}
        })}
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Bad help article',
        errorMessage: 'Help article not found',
        name: 'Dimitar Piskov'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Bad address',
        errorMessage: 'Page not found',
        name: 'Dimitar Piskov'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})