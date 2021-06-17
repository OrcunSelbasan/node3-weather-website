const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=da5bcbeb91cc162b9e818d70afb3f0ad&query='+ long + ','+lat +'&units=m'

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast