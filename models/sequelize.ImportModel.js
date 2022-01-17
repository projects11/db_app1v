//Модель Импорт таблицы БД
const {Sequelize, DataTypes, Model} = require('sequelize')


const sequelize = new Sequelize('umbmvdqn', 'umbmvdqn', 'SFVCdUDKEIBtkWDPmTjar5PgHiK1SldU', {
    host: 'hattie.db.elephantsql.com',
    dialect: 'postgres'
})


class Person extends Model{}
Person.init(
    {
        id: {type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true },
        fio: {type: DataTypes.STRING, allowNull: false},
        firstname: {type: DataTypes.STRING, allowNull: false},
        surname: {type: DataTypes.STRING, allowNull: false},
        patronymic: {type: DataTypes.STRING, allowNull: false},
        sex:{type: DataTypes.INTEGER, allowNull:false},
        prof:{type:DataTypes.STRING},
        city:{type: DataTypes.STRING, allowNull:false},
        birth:{type: DataTypes.DATE},
        source:{type: DataTypes.STRING},
        email:{type:DataTypes.STRING},
        phone:{type:DataTypes.STRING},
        placeofwork: {type:DataTypes.STRING},
        salary: {type:DataTypes.INTEGER},
        region:{type:DataTypes.STRING},
        education_place:{type:DataTypes.STRING},
        edu_degree:{type:DataTypes.STRING},
        edu_endyear:{type:DataTypes.INTEGER},
        edu_full:{type:DataTypes.STRING}


        },
{
    sequelize,
        modelName: 'data_table',
    tableName: 'data_table',
    timestamps:false}

)

async function testInsert(inp_arr){
    const p1 = await Person.create({
        fio: inp_arr[0],
        firstname:inp_arr[1],
        surname: inp_arr[2],
        patronymic:inp_arr[3],
        sex:inp_arr[4],
        prof: inp_arr[5],
        city: inp_arr[6],
        birth: inp_arr[7],
        source:inp_arr[8],
        email:inp_arr[9],
        phone:inp_arr[10],
        placeofwork:inp_arr[11],
        salary: inp_arr[12],
        region: inp_arr[13],
        education_place:inp_arr[14],
        edu_degree:inp_arr[15],
        edu_endyear:inp_arr[16],
        edu_full:inp_arr[17]
    });
    return p1

}



module.exports = {testInsert , Person }
