const request = require('request')
const forecast = (latitude, longitute, callback) => {
    const url = 'https://api.darksky.net/forecast/69aaa771dacd5b21971c1b1611b2148b/' + latitude + ',' + longitute;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!!', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined,body.daily.data[0].summary + "It is currently" + ' ' + body.currently.temperature)
        }

    })

}

module.exports = forecast