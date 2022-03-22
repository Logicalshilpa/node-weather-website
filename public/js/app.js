//57 video section 8 incomplete (fetch not working)
// // const fetch = require("node-fetch");
// import express from 'express';
// import fetch from 'node-fetch';
// import path from'path';

console.log('Client Side javascript file is loaded')

// fetch('https:/puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
// app.listen(3000 , () => {
//     console.log('Server is up on port 3000.')
// })   


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')


weatherForm.addEventListener('submit' , (e) => {
    e.preventDefault()

    const location = search.value

     messageOne.textContent ='Loading'
     messageOne.textContent =''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent =JSON.stringify(data.location)
            messageTwo.textContent =JSON.stringify(data.forecast)
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
}) 


  