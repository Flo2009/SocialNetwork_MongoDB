const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single student
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No User with that ID' })
      }

      res.json({
        user,
        
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new student
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a student and remove them from the course
  async deleteUser(req, res) {
    try {
      console.log(req.params.userId );
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such User exists' });
      }

      

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try{

      const user= await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },// This will contain the fields you want to update
        { new: true, runValidators: true}  // Options to return the updated document and run validators
      );
    
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    
      res.status(200).json(user);
    
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  };
  
},

async addFriend(req, res) {
  try {
   // Add the friendId to the user's friends array
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }, // $addToSet prevents duplicate friends
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error adding friend', error: err });
  }
},

async removeFriend(req, res) {
  try {
    // Remove the friendId from the user's friends array
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }, // $pull removes the friendId from the array
      { new: true, useFindAndModify: false }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error removing friend', error: err });
  }
},
}
