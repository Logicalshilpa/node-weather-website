const request = require('request')

const forecast =(latitude, longitude , callback) => {
const url='http://api.weatherstack.com/current?access_key=afd1864b7a25ea30522c92407f08ebfd&query='+latitude+','+longitude+'&units=m'

    request({url ,json : true} ,(error , {body}={}) => {

        if(error){
            callback('Unable to connect to weather services')
        }
        else if(body.error){
            callback('The info you entered is invalid')
        }else{
            callback(undefined,{
                location: body.location.name,
                weather: body.current.weather_descriptions +".  It is currently "+body.current.temperature+ " degrees out. It feels like "+body.current.feelslike+" degrees out. The humidity is"+body.current.humidity+"%."
         } )
        }

    }
    )
}

module.exports = forecast