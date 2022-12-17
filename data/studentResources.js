const mongoCollections = require('../config/mongoCollections');
const teachers = mongoCollections.teachers;
const studentResourcesCollection = mongoCollections.studentResources;
const createCourse = mongoCollections.createCourse
const { ObjectId } = require('mongodb');
const validation = require('../helpers');
const { ObjectId } = require('mongodb');


const createNewCourse = async (
    teachersUsername,
    courseName,
    descripiton

) => {

    teachersUsername = validation.checkUsername(teachersUsername, "Teachers Username")

    const teachersCollection = await teachers()
    const currentTeacher = await teachersCollection.findOne({ 'userName': teachersUsername })
    if (!currentTeacher) throw "Error: No users with the given userName"

    let newCourse = {
        teachersUsername: teachersUsername,
        courseName: courseName,
        descripiton: descripiton,
    }
    const courseCollection = await createCourse()
    const newInsert = await courseCollection.insertOne(newCourse)
    if (newInsert.insertedCount === 0) {
        throw 'Course not created'
    }

    return true

}

const addResources = async (
    teachersUsername,
    courseName,
    url
) => {
    teachersUsername = validation.checkUsername(teachersUsername, "Teachers Username")
    const courseCollection = await createCourse()
    const courseObj = courseCollection.find({ $and: [{ 'teachersUsername': teachersUsername }, { 'courseName': courseName }] })
    const courseId = String(courseObj._id)

    const studentResources = await studentResourcesCollection()

    let resourseExist = await studentResources.findOne({ 'courseName': courseName })
    if (!resourseExist) {
        let urlArr = [url]
        let newResource = {
            _id: ObjectId(courseId),
            url: urlArr
        }

        const newInsert = await studentResources.insertOne(newResource)
        if (newInsert.insertedCount === 0) {
            throw 'Resource not created'
        }


    } else {
        let oldUrl = await studentResources.findOne({ '_id': ObjectId(courseId) })
        let oldUrlArr = oldUrl.url
        let newUrlArr = oldUrlArr.push(url)

        await studentResources.updateOne(
            { _id: ObjectId(courseId) },
            { $set: { url: newUrlArr } }
        );
    }

    return true




}


const getResources = async (
    teachersUsername,
    courseName
) => {
    const courseCollection = await createCourse()
    const currentCourse = courseCollection.find({ $and: [{ 'teachersUsername': teachersUsername }, { 'courseName': courseName }] })
    const courseId = String(currentCourse._id)
    const studentResources = await studentResourcesCollection()
    const resources = await studentResources.findOne({ '_id': ObjectId(courseId) })

    return resources.url
}


module.exports = {
    createNewCourse: createNewCourse,
    addResources: addResources,
    getResources: getResources

}