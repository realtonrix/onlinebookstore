const storeModel = require("../model/store.model");
const cloudinary = require("../config/cloudinary");
const userModel = require("../model/user.model");
const mongoose = require("mongoose");

const createBook = async (req, res) => {
  try {
    const { title, author, summary } = req.body;
    const cloudImage = await cloudinary.uploader.upload(req.file.path);
    const getUser = await userModel.findById(req.params.id);
    const isbnNumberCreate = Math.floor(Math.random() * 10000);

    const createBook = await new storeModel({
      title,
      author,
      summary,
      ISBN: `SUPERBOOK7-${isbnNumberCreate}`,
      avatar: cloudImage.secure_url,
      avatarID: cloudImage.public_id,
    });

    createBook.users = getUser;
    createBook.save();

    getUser.shop.push(new mongoose.Types.ObjectId(createBook._id));
    getUser.save();

    res.status(201).json({
      message: "Book Created Successfully",
      data: createBook,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Failed to create new book",
      data: error,
    });
  }
};

const getBook = async(req, res) => {
  try {
    const getUser = await userModel.findById(req.params.id).populate("shop");
    res.status(200).json({
      message: "Your books",
      data: getUser,
    });

  }
  catch (error){
    res.status(400).json({
      message: "Failed to get book",
      data: error,
    });
  }
};

const getSingleBook = async(req, res) =>{
  try{
    const bookData = await storeModel.findByID(req.params.id);
    res.status(200).json({
      message: "Single Book gotten successfully",
      data: bookData,
    });
  
  }
  catch(error){
    res.status(400).json({
      message: "Failed to get a single book",
      data: error,
    });
  }
};

const deleteBook = async (req, res) =>{
  try{
    const geUser = await userModel.findByID(req.params.id);
    const removeBook = await storeModel.findByIdAndDelete(req.params.bookID);

    getUser.shop.pull(removeBook);
    getUser.save();

    res.status(200).json({
      message: "deleted successfully",
      data: getUser,
    });

  } catch (error){
    res.status(400).json({
      message: "Failed to delete book",
      data: error,
    });
  }

};

const updateBook = async (req, res) =>{
  try {
      const {title, author} = req.body;
      const updateData = await storeModel.findByIdAndUpdate(req.params.id, 
        {title, author}, 
        {new: true}
      );
     
      res.status(201).json({
        message: "Updated successfully",
        data: updateData,
      });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update the book",
      data: error,
    });
  }
};

module.exports = { createBook, getBook, getSingleBook, deleteBook, updateBook};
