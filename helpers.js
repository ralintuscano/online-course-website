const { ObjectId } = require('mongodb')

const checkName = (
    name,
    str

) => {

    if (!name) {
        throw `Error: You must supply a ${str}`
    }
    if (typeof name !== 'string') throw `Error: ${str} must be a String`
    name = name.trim()
    if (name.length === 0) {
        throw `Error: ${str} cannot be just empty spaces`
    }
    if (name.length < 3) {
        throw `Error: ${str} must be atleast 3 characters long!`
    }
    if (!isNaN(name)) {
        throw `Error: ${str} is not a valid value as it only contains digits`;
    }

    return name

};


const checkPhone = (
    phone,
    str
) => {
    if (!phone) {
        throw `Error: You must supply a ${str}`
    }
    phone = phone.trim()
    if (phone.length != 10) {
        throw `Error: ${str} must be a 10 digit number`
    }
    if (isNaN(phone)) {
        throw `Error: ${str} must have only numbers!`
    }

    return phone


}


const checkAddress = (
    address,
    str
) => {
    if (!address) {
        throw `Error: ${str} must be provided`
    }
    if (typeof address !== 'string') {
        throw `Error" ${str} must be a string!`
    }
    address = address.trim()

    if (address.length === 0) {
        throw `Error: ${str} cannot be only spaces`
    }
    if (address.length < 15) {
        throw `Error: Invalid address! Enter full address`
    }

    return address

}

const checkUsername = (
    userName,
    str
) => {
    const chars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (typeof userName !== 'string') {
        throw `Error" ${str} must be a string!`
    }
    userName = userName.trim()
    if (userName.length === 0) {
        throw `Error: ${str} cannot be only spaces`
    }
    if (userName.length < 4) {
        throw `Error: The ${str} must be atleast 4 characters long`
    }
    if (chars.test(userName)) {
        throw "Error: The username cannot have special characters and spaces. It should only have alphanumeric characters!"
    }

    return userName
}


module.exports = {
    checkName: checkName,
    checkAddress: checkAddress,
    checkPhone: checkPhone,
    checkUsername: checkUsername,
}