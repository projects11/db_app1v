const express = require('express')
const path = require('path')
const fs = require('fs')
// const multer = require('multer')
const expshb =require('express-handlebars')
var cors = require('cors');

const contactsRouter = require('./routes/contacts.routes')



const PORT = process.env.PORT || 3000


const app = express()
const hbs =expshb.create({
    defaultLayout:'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
//Указываем папку hbs
app.set('views', 'views')


app.use(cors({origin: 'http://localhost:4200'}))

app.use(express.static(path.join(__dirname,'custom')))
app.use(express.urlencoded({extended:true}))


app.use('/', contactsRouter)








app.listen(PORT, ()=>{
    console.log(`Сервер запущен на порту ${PORT}`)})
