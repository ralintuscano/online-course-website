const bcrypt = require('bcrypt');
const mongoCollections = require('./../config/mongoCollections');
const users = mongoCollections.user_collection;
const {ObjectId} = require('mongodb');

const USERNAME_REGEX = /^[a-zA-Z0-9]{4,}$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*([^a-zA-Z\d\s])).{6,}$/;

const createUser = async (
  username, password
) => { 
  //check for username exists.
  let errMsg = '';

  if (username.trim().length === 0)
      return {errMsg : 'Username cannot be an empty string or just spaces'}
  if (password.trim().length === 0)
      return {errMsg : 'Password cannot be an empty string or just spaces'}
  
  if (!checkRegexFn(USERNAME_REGEX,username)) 
    return {errMsg : 'Invalid username format'}
  
  if (!checkRegexFn(PASSWORD_REGEX,password)) 
    return {errMsg : 'Invalid password format'}

    const user_collection = await users();

    const getUser = await user_collection.findOne({username: username.toLowerCase()});

    if (getUser?.username === username.toLowerCase()) 
      return {errMsg: 'A user with this username already exists'}

    const hashedPwd = await bcrypt.hash(password,10);

    let newUser = {
      username: username.toLowerCase(),
      password: hashedPwd
    };

    const insertInfo = await user_collection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      return {code: 500 , errMsg:'Could not add User'};

  // const testing = await bcrypt.compare(password,hashedPwd);
  // console.log("BCRYPE COMPARE ", testing);

  return {insertedUser: insertInfo.acknowledged,errMsg};

};

const checkUser = async (username, password) => { 
  let errMsg = '';

  if (username.trim().length === 0)
      return {errMsg : 'Username cannot be an empty string or just spaces'}
  if (password.trim().length === 0)
      return {errMsg : 'Password cannot be an empty string or just spaces'}
  
  if (!checkRegexFn(USERNAME_REGEX,username)) 
    return {errMsg : 'Invalid username format'}
  
  if (!checkRegexFn(PASSWORD_REGEX,password)) 
    return {errMsg : 'Invalid password format'}

  const user_collection = await users();

  const getUser = await user_collection.findOne({username: username.toLowerCase()});

  if(!getUser){
    return {errMsg : "Either the username or password is invalid"}
  }

  const checkPassword = await bcrypt.compare(password,getUser?.password);

  if(!checkPassword){
    return {errMsg: "Either the username or password is invalid"}
  }

  return {authenticatedUser: !!getUser,errMsg};
};


const checkRegexFn = (regex_exp,input) => {

  return regex_exp.test(input);

}

module.exports = {createUser,checkUser};
