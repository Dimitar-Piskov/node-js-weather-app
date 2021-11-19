const request = require('postman-request')

const weatherstack = (latitude, longitude, location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=518639662b9d5cfee21a08cd2cddd26e&query=' + latitude + ',' + longitude + '&units=m'

    request({url , json: true}, (error, {body}) => {
        try{
        if(error)
            {
            callback('Service unavailable.')
            } 
        else if(body.error || body === {})
            {
            callback('Unable to find location.')
            }
        else{
            const currentWeatherReport = body.current
        callback(undefined, 
            {
                cloudCoverage: currentWeatherReport,
                location: location,
                weatherDescription: currentWeatherReport.weather_descriptions,
                currentTemperature: currentWeatherReport.temperature,
                chanceToRain: currentWeatherReport.precip,
                feelsLike: currentWeatherReport.feelslike
            })
        }}
        catch(error){
            callback('Unable to find location.')
        }
    })
}
module.exports = weatherstack