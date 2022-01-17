const {Sequelize, DataTypes, Model} = require('sequelize')


const sequelize = new Sequelize('umbmvdqn', 'umbmvdqn', 'SFVCdUDKEIBtkWDPmTjar5PgHiK1SldU', {
    host: 'hattie.db.elephantsql.com',
    dialect: 'postgres'
})




class Contact extends Model{}
Contact.init(
    {
        id: {type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true },
        fio: {type: DataTypes.STRING, allowNull: false},
        sex:{type: DataTypes.INTEGER},
        city:{type: DataTypes.STRING, allowNull:false}, //, references:{model:'City', key:'id'}},
        birth:{type: DataTypes.DATE},
        source:{type: DataTypes.STRING},
        //source:{type: DataTypes.INTEGER},


    },
    {
        sequelize,
        modelName: 'contact',
        tableName: 'Contact',
        timestamps:false}
)


class City extends Model{}
City.init(
    {
        id: {type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true },
        name: {type: DataTypes.STRING, allowNull: false},
        region_id: {type: DataTypes.INTEGER}
    },
    {
        sequelize,
        modelName: 'City',
        tableName: 'City',
        timestamps:false}
)

class Education extends Model{}
Education.init({
    id:{type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true},
    user_id:{type: DataTypes.INTEGER, allowNull: false, references:{model:'Contact', key:'id'} },
    place:{type: DataTypes.STRING},
    degree:{type: DataTypes.STRING},
    endyear:{type:DataTypes.INTEGER}
},
    {
        sequelize,
        modelName: 'Education',
        tableName: 'Education',
        timestamps:false})


class Email extends Model{}
Email.init({
    id:{type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true},
    user_id:{type: DataTypes.INTEGER, allowNull: false, references:{model:'Contact', key:'id'} },
    email:{type: DataTypes.STRING}
},
    {
        sequelize,
        modelName: 'Email',
        tableName: 'Email',
        timestamps:false})

class Phone extends Model{}
Phone.init({
    id:{type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true},
    user_id:{type: DataTypes.INTEGER, allowNull: false, references:{model:'Contact', key:'id'} },
    phone_number:{type: DataTypes.STRING}

},
    {
        sequelize,
        modelName: 'Phone',
        tableName: 'Phone',
        timestamps:false})

class Placeofwork extends Model{}
Placeofwork.init({
    id:{type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true},
    user_id:{type: DataTypes.INTEGER, allowNull: false, references:{model:'Contact', key:'id'} },
    name:{type: DataTypes.INTEGER},
    salary:{type: DataTypes.INTEGER}
},
    {
        sequelize,
        modelName: 'Placeofwork',
        tableName: 'Placeofwork',
        timestamps:false})

class Profession extends Model{}
Profession.init({
    id:{type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true},
    user_id:{type: DataTypes.INTEGER, allowNull: false, references:{model:'Contact', key:'id'} },
    name:{type: DataTypes.STRING}
},
    {
        sequelize,
        modelName: 'Profession',
        tableName: 'Profession',
        timestamps:false})

class Region extends Model{}
Region.init({
    id:{type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true},
    name:{type: DataTypes.STRING}

},
    {
        sequelize,
        modelName: 'Region',
        tableName: 'Region',
        timestamps:false})

class Source extends Model{}
Source.init({
    id:{type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true},
    name:{type: DataTypes.STRING}
},
    {
        sequelize,
        modelName: 'Source',
        tableName: 'Source',
        timestamps:false})

class Tag extends Model{}
Tag.init({
    id:{type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true},
    user_id:{type: DataTypes.INTEGER, allowNull: false, references:{model:'Contact', key:'id'} },
    name:{type: DataTypes.STRING}
},
    {
        sequelize,
        modelName: 'Tag',
        tableName: 'Tag',
        timestamps:false})

class User extends Model{}
User.init({
    id:{type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true},
    name:{type: DataTypes.STRING},
    tag:{type: DataTypes.STRING},
    foer_id:{type: DataTypes.INTEGER},
},
    {
        sequelize,
        modelName: 'User',
        tableName: 'User',
        timestamps:false})


class Post extends Model{}
Post.init({
        id:{type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true, allowNull: false, unique:true},
        test1_id:{type: DataTypes.INTEGER, references:{model:'User', key:'id'}},
        tag:{type: DataTypes.STRING},
    },
    {
        sequelize,
        modelName: 'Post',
        tableName: 'Post',
        timestamps:false})



module.exports = {
    sequelize,
    Contact,
    City,
    Education,
    Email,
    Phone,
    Placeofwork,
    Profession,
    Region,
    Source,
    Tag,
    User,
    Post

}



