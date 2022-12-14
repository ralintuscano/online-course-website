const mongoCollections = require('../config/mongoCollections');
const teachers = mongoCollections.teachers;
// const posts = mongoCollections.posts;
const { ObjectId } = require('mongodb');
const validation = require('../helpers');


const createTeacher = async (
    firstName,
    lastName,
    userName,
    department,
    address,
    phoneNumber,
    gender,
) => {
    firstName = validation.checkName(firstName, 'First Name')
    lastName = validation.checkName(lastName, 'Last Name')
    userName = validation.checkUsername(userName, 'User Name')
    address = validation.checkAddress(address, 'Address')
    phoneNumber = validation.checkPhone(phoneNumber, 'Mobile Number')
    department = validation.checkName(department, "Department")

    if (!gender) {
        throw "Error: gender must be provided"
    }

    const teachersCollection = await teachers()

    let newTeacher = {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        department: department,
        address: address,
        phoneNumber: phoneNumber,
    }

    const newInsert = await teachersCollection.insertOne(newTeacher)
    if (newInsert.insertedCount === 0) {
        throw 'Profile update failed'
    }

    return true

};

const getTeacherByUsername = async (userName) => {

    userName = validation.checkUsername(userName, "Username")
    const teachersCollection = await teachers()
    const currentTeacher = await teachersCollection.findOne({ userName: userName })
    if (!currentTeacher) throw "Error: No users with the given userName"
    return currentTeacher
}

const getAllTeachers = async () => {
    const teachersCollection = await teachers()
    const teachersList = await teachersCollection.find({}).toArray()
    if (!teachersList) throw "No teachers in the database found"
    return teachersList
}

const checkValidUserNameTeacher = async (userName) => {
    userName = validation.checkUsername(userName, "Useraname")
    const teachersCollection = await teachers()
    const currentTeacher = await teachersCollection.findOne({ userName: userName })
    if (currentTeacher) {
        return true
    } else {
        return false
    }

}

const updateTeacher = async (
    oldUserName,
    firstName,
    lastName,
    userName,
    department,
    address,
    phoneNumber,
    gender,
) => {
    oldUserName = validation.userName(oldUserName, "Old Username")
    firstName = validation.checkName(firstName, 'First Name')
    lastName = validation.checkName(lastName, 'Last Name')
    userName = validation.checkUsername(userName, 'User Name')
    address = validation.checkAddress(address, 'Address')
    phoneNumber = validation.checkPhone(phoneNumber, 'Mobile Number')
    department = validation.checkName(department, "Department")
    if (!gender) {
        throw "Error: gender must be provided"
    }

    const currentTeacherExist = await checkValidUserNameTeacher(oldUserName)

    if (!currentTeacherExist) {
        throw `Error: Profile with username ${oldUserName} not found in database`
    }


    let updateInfo = {
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        department: department,
        address: address,
        phoneNumber: phoneNumber,
    }
    const teachersCollection = await teachers()
    const currentUpdate = await teachersCollection.updateOne(
        { userName: oldUserName },
        { $set: updateInfo }
    )
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
        throw 'Update failed';
    } else {
        return true
    }

}


module.exports = {
    createTeacher: createTeacher,
    getTeacherByUsername: getTeacherByUsername,
    getAllTeachers: getAllTeachers,
    checkValidUserNameTeacher: checkValidUserNameTeacher,
    updateTeacher: updateTeacher
}