const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      email,
      password: hashed,
    });

    res.status(201).json({
      message: "User Created",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to Sign Up User",
      data: error,
    });
  }
};


const getAllUsers = async(req, res) =>{
  try{
      const allUsers =  await userModel.find()
      res.status(200).json({
        message: "Data gotten successfully",
        data: allUsers
      })
  } catch (error){
    res.status(400).json({
      message: "Failed to fetch users",
      data: error
    })
  }
}

const signInUser = async(req, res) => {
  try{
    const {email, password} = req.body
    //check if the email exists on DB
    const user= await userModel.findOne({email})
    //Write a condition to check if the user exists or not
    if(user){
        const checkPassword = await bcrypt.compare(password,user.password)
        //Write a condition to check if the password is correct or not
        if(checkPassword){
          const token = jwt.sign({_id: user._id},"SeCrEaTkEy", {expiresIn:"1h"})
          const {password, ...info} = user._doc
          res.status(200).json({
            message: "Signed in successfully",
            data: {token, ...info}
          })
        }else{
            res.status(400).json({
              message: "Password is incorrect"
            })
        }
    } else{
      res.status(400).json({
        message: "User not found",
        
      })
    }
  } catch {

  }
}

const getOneUser = async(req, res)=> {
  try{
      const oneUser = await userModel.findById(req.params.userID);
      res.status(200).json({
        Message: "User gotten successfully",
        data: oneUser,
      });
  } catch (error){
    res.status(400).json({
      message: "An error occured getting this user",
      data: error,
    });
  }
};

module.exports = { signUpUser, getAllUsers, signInUser, getOneUser};
