 const express = require('express')
 const path = require('path')
 const hbs = require('hbs')
 const geocode = require('./utils/geocode')
 const forecast = require('./utils/forecast')

//   console.log(__dirname)
//   console.log(__filename)
//   console.log(path.join(__dirname , '../public'))

 const app = express()

 //Define paths for express config
 const publicDirPath = path.join(__dirname,'../public')
 const viewsPath = path.join(__dirname,'../templates/views')
 const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location/directory which changed to templates
 app.set('view engine' , 'hbs')
 app.set('views',viewsPath)
 hbs.registerPartials(partialsPath)

 //setup static directory to serve 
 app.use(express.static(publicDirPath))

//  app.get('',(req,res) => {
//      res.send('<h1>Hello Express!</h1>')
//  })

 app.get('',(req , res) => {
     res.render('index' , {
         title : 'Weather',
         name : 'Use this site to get your weather'
     })
 })

 
 app.get('/about',(req , res) => {
    res.render('about' , {
        title : 'About',
        msg : 'Know your weather',
        name : 'Shilpa'
    })
})


app.get('/help',(req , res) => {
    res.render('help' , {
        title : 'Help',
        msg : 'How can we help you?',
        name :'Shilpa'
    })
})

app.get('/weather',(req,res)=> {
    if(!req.query.address){
        return res.send({
            error:'Please Provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecasteData) => {
            if(error){
                return res.send({error})
            }

            res.send({
              forecast: forecasteData,
              location ,
              address :req.query.address
            })
        })
    })

    // console.log(req.query.search)
    // res.send({
    //     forecast: 'It is Snowing',
    //     location: 'Hazaribag',
    //     address :req.query.search
    // })
})

app.get('/products',(req,res)=> {
    if(!req.query.search){
        return res.send({
            error : 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*' , (req,res) => {
    res.render('404',{
        title:'404',
        name:'Shilpa',
        errorMessage:'Oops,Help article not found'
    })
})

app.get('*' , (req,res) => {
    res.render('404',{
        title:'404',
        name:'Shilpa',
        errorMessage:'Page not found'
    }) 
})




//  app.get('/help',(req,res)=> {
//      res.send('Help Page')
//  })

//  app.get('/about',(req,res)=> {
//     res.send('About Page')
// })



 app.listen(3000 , () => {
     console.log('Server is up on port 3000.')
 })  