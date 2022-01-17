const Router = require('express')
const router = new Router()
// const contactsModel = require('../models/contacts.model')
const mainModel = require('../models/sequelize.mainModel')
const {Sequelize} = require("sequelize");
const uploadCsv = require('../models/uploadCsv')
const updateTable = require('../models/toProjectTables')
const multer = require('multer')
// const {json} = require("express");
const upload = multer({
    storage: multer.memoryStorage(),
});


// router.use(json)
//Основной get для handlebars
router.get('/hbs', async (req, res)=>{
    const alldata = await mainModel.getAllContactData("all")
    res.render('index',{
        title: 'База данных',
        alldata
    })
})


router.post(
    '/add',
    upload.single('csvfile'),
    (req, res) => {
        // console.log(req.body);
        // console.log(req.file);
        // console.log(res);
        res.status(204).json({});
        // console.log(req.file.buffer.toString());
        uploadCsv(req.file.buffer.toString())
        res.redirect('/')


    }
);


router.get(
    '/update', async(req, res)=> {
        const info = await updateTable()
        res.send(info)
        res.redirect('/')

    }
)



//Основной get для angular
router.get('/', async (req, res)=>{
    const alldata = await mainModel.getAllContactData("all")
    res.json(alldata)

    })




module.exports = router