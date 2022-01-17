
const underscore = require('underscore')

const projectTab = require('./sequelize.mainModel');
const startTab = require('./sequelize.ImportModel');


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
    Tag,
    User,
    Post
} = require('./db.orm.models')



async function dataTransform(){
    // const amount = await startTab.Person.count()
    const successArray = []
    const failureArray = []
    //email для проверки
    const emails = await Email.findAll({
        attributes: ['email']
    })

    //id для
    const ids = await startTab.Person.findAll({
        attributes: ['id']
    })
    const idsReady = JSON.parse(JSON.stringify(ids))
    for (let idx of idsReady){
        // console.log(idx['id'])
        let currentObj = await startTab.Person.findOne({
            where: {
                id: idx['id']
            }
        })
        // console.log(JSON.parse(JSON.stringify(currentObj)))
        const newObj = dataTransformInner(JSON.parse(JSON.stringify(currentObj)))

            if (newObj['email'].length > 1 && newObj['fio'].length > 1) {
            // console.log(newObj)
                if (newObj['email'].match(/@.+\./)) {

                    if (!underscore.contains(emails,newObj['email'] )){
                    //Вставка и удаление текущей
                    await insertTables(newObj)
                    successArray.push(newObj)
                    await startTab.Person.destroy({
                            where:{
                                id: idx['id']
                            }
                        })

                     }else{
                    console.log('___________','\n','\n','\n', 'Такой email уже есть','\n','\n','\n','_______________')
                    failureArray.push(newObj)
                    }
                }else{
                    console.log('___________','\n','\n','\n', 'Неправильный email','\n','\n','\n','_______________')
                    failureArray.push(newObj)
                }
            }else{
                console.log('___________','\n','\n','\n', 'Email или Имя не содержит значения','\n','\n','\n','_______________')
                failureArray.push(newObj)
            }
        }
        return {success: successArray, failure: failureArray}
    }

// dataTransform()

function dataTransformInner(inputObj){
    //Функция создано на тот случай, если потребуется дополнительная обработка значений массива
    // const inputObject = inputObj

    return  {
        fio: inputObj.fio,
        sex: inputObj.sex,
        city: inputObj.city,
        birth: inputObj.birth,
        source: inputObj.source,

        profession: inputObj.prof,

        email: inputObj.email,

        phone: inputObj.phone,

        placeOfWork: inputObj.placeofwork,
        salary: inputObj.salary.split(".")[0].replace(/[., $]/g,""),

        eduPlace: inputObj.education_place,
        eduDegree: inputObj.edu_degree,
        eduEndyear: inputObj.edu_endyear,
        eduFull: inputObj.edu_full,

    }
}

async function insertTables(obj){


    const q = await sequelize.query( `DO $$
        DECLARE returned_id int;
        BEGIN
        INSERT INTO "Contact"
        (fio, sex, city, birth, source) VALUES
        ('${obj.fio}', ${obj.sex}, '${obj.city}', '${obj.birth}', '${obj.source}')
        RETURNING id INTO returned_id;
    
        INSERT INTO "Profession"
        (user_id, name) VALUES
        (returned_id, '${obj.profession}');
    
        INSERT INTO "Email"
        (user_id, email) VALUES
        (returned_id, '${obj.email}');
    
        INSERT INTO "Phone"
        (user_id, phone_number) VALUES
        (returned_id, '${obj.phone}');
    
        INSERT INTO "Placeofwork"
        (user_id, name, salary) VALUES
        (returned_id, '${obj.placeOfWork}', ${obj.salary});
    
    
        INSERT INTO "Education"
        (user_id, place, degree, endyear) VALUES
        (returned_id, '${obj.eduPlace}', '${obj.eduDegree}', ${obj.eduEndyear});
    
        END;
        $$;`
    )
}


module.exports = dataTransform

