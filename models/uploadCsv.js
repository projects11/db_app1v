//Функция для превращения полученных из файла данных в запросы в БД
const CSV = require('csv-string')
const insertQuery = require('./sequelize.ImportModel')


async function csvToDb(data){
    const data_ = await data
    // console.log(data_)
    // const dataJson = JSON.parse(JSON.stringify(data_))
    // console.log(dataJson)
    const parsedCsv = CSV.parse(data_)
    // console.log(parsedCsv)
    for (let str of parsedCsv){
        // console.log(str.length, str)
        if (str.length === 18){
            insertQuery.testInsert(str)

        }else{
            console.log(str)
        }
    }
}


module.exports = csvToDb