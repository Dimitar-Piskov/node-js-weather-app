const request = require('postman-request')

const geocode = (address, callback) => {
    if(address.length === 0){
        callback('Must provide address.')
    }
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGltaXRhci1waXNrb3YiLCJhIjoiY2t3MjNoNTAwMWVwNTJvbm80NTM5dGtwZiJ9.yBlBoEY5J2nPzcLXWnw5oQ&limit=1'
    request({url, json: true}, (error, {body} = {}) => 
    {
        try{
        if(error){
            callback('Unable to connect to location services.')
        } 
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search.')
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }}
        catch(error){
            callback('Unable to find location. Try another search.')
        }
    })
}

module.exports = geocode