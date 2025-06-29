const{signin,signup}=require('../controller/AuthController');
const{signupValidation,siginValidation}=require('../middleware/Authvalidation');
const UserModel = require('../modules/User'); // Importing UserModel

const router=require('express').Router();//using express router

//routing to signup and signin
router.post('/signup',signupValidation,signup);
router.post('/signin',siginValidation,signin);
//user get
router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find(); // get all users from MongoDB
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});
//user delete
router.delete('/users/:id', async (req, res) => {
    const userId= req.params.id; // get user ID from request parameters
    try{
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        console.log(req.params.id);
         // delete user by ID
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    }
    catch(err){
        res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
});
//user update
router.put('/users/:id', async (req, res) => {
    const userId = req.params.id; // get user ID from request parameters
    const{name,email,password}=req.body;
    try{
        const updateuser=await UserModel.findByIdAndUpdate(userId, {
            name: name,
            email: email,
            password: password
        }, { new: true }); // update user by ID and return the updated user
        if (!updateuser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updateuser });
    }
    catch(err){
        return res.status(500).json({ error: 'Failed to update user', details: err.message });
    }

});
module.exports=router; //exporting router