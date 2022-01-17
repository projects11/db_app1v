// Модель для получения данных из БД

const {Sequelize, DataTypes, Model} = require('sequelize')

const {
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
    Tag
} = require('./db.orm.models')



class MainModel {
    constructor(contact, city, education, email, phone, placeOfWork, profession, region, source, tag) {
        this.contact = contact
        this.city = city
        this.education = education
        this.email = email
        this.phone = phone
        this.placeofwork = placeOfWork
        this.profession = profession
        this.region = region
        this.source = source
        this.tag = tag

    }


    async getAllFields(){
        // this.contact.belongsTo(this.city, {foreignKey:'city'})
        // this.city.hasMany(this.contact,{foreignKey:'id'})

        this.contact.hasMany(this.education, {foreignKey:'user_id'})
        this.education.belongsTo(this.contact, {foreignKey:'id'})

        this.contact.hasMany(this.email, {foreignKey:'user_id'})
        this.email.belongsTo(this.contact, {foreignKey:'id'})

        this.contact.hasMany(this.phone, {foreignKey:'user_id'})
        this.phone.belongsTo(this.contact, {foreignKey:'id'})
        //
        this.contact.hasMany(this.placeofwork, {foreignKey:'user_id'})
        this.placeofwork.belongsTo(this.contact, {foreignKey:'id'})
        //
        this.contact.hasMany(this.profession, {foreignKey:'user_id'})
        this.profession.belongsTo(this.contact, {foreignKey:'id'})

        // this.contact.belongsTo(this.source, {foreignKey:'source'})
        // this.source.hasMany(this.contact, {foreignKey:'id'})

        this.contact.hasMany(this.tag, {foreignKey:'user_id'})
        this.tag.belongsTo(this.contact, {foreignKey:'id'})



        const w = await this.contact.findAll({include:
            [//this.city,
            this.education,
            this.email,
            this.phone,
            this.placeofwork,
            this.profession,
            // this.source,
            this.tag
            ]

        })
        console.log(w)
        return w

        // console.log(JSON.stringify(w, null, 2))
        // return JSON.stringify(w, null, 2)
    }


    async getAllContactData(someGetFieldsFunction){

        const sum_arr = []

        const defaultStr = ''
        const defaultSex = 0
        const defaultCity = 'неизвестно'
        const defaultEdu = 'неизвестно'
        const defaultBirth = ''


        if (someGetFieldsFunction === "all"){
             const d = await mainModel.getAllFields()

            // console.log(d)

             d.forEach((item, i)=>{
                 // console.log(JSON.stringify(item.Emails[0]["email"], null, 2))
                const newObj = {

                    // item: item
                    fio: item["fio"],
                    sex: item["sex"],
                    city: item["city"],
                    birth: item?.["birth"] ?? defaultBirth,
                    source: item?.["source"] ?? defaultBirth,

                    edu_place: item.Education?.[0]?.['place'] ?? defaultStr,
                    edu_degree: item.Education?.[0]?.['degree'] ?? defaultStr,
                    edu_endyear: item.Education?.[0]?.['endyear'] ?? defaultStr,

                    emails: item.Emails?.[0]?.["email"] ?? defaultStr,

                    phone: item.Phones?.[0]?.["phone_number"] ?? defaultStr,

                    placeofwork: item.Placeofworks?.[0]?.['name'] ?? defaultStr,
                    salary: item.Placeofworks?.[0]?.['salary'] ?? null,

                    profession: item.Professions?.[0]?.['name'] ?? defaultStr,




                }
                sum_arr.push(newObj)
            })

            // console.log(JSON.parse(JSON.stringify(sum_arr)))

            return JSON.parse(JSON.stringify(sum_arr))

        }else if(someGetFieldsFunction === "one"){
            const getData = "Вставить нужный метод"
        }
    }

    async insertNewContact(inputData){

    contact.city = contact.belongsTo(city)
    contact.email = contact.hasMany(email)




    }

}


const mainModel =  new MainModel(Contact, City, Education, Email, Phone, Placeofwork, Profession, Region, Source, Tag)

module.exports = mainModel