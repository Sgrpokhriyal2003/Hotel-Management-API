const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const {jwtAuthMiddleware,generateToken} = require("../authentication/auth");

//post a person - POST
router.post("/signup", async (req, res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log("person saved!");
        return res.status(201).json({message: "Person Created!"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
});

//Login -: POST
router.post("/login", async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await Person.findOne({username: username});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: "Invalid Username Or Password"});
        }

        //generate token
        const payload = {
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload);
        return res.json(token);
    }
    catch(error){
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"});
    }
});

//profile route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("user data: ", userData);
        const userId = userData.id;
        const user = await Person.findById(userId);
        return res.status(200).json({user});

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: "Internal Server Error"});
    }
});

//get all person data - GET 
router.get("/", jwtAuthMiddleware, async (req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        return res.status(200).json(data);
    }
    catch(error){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//update person - PUT/:id
router.put("/:id", async (req, res) => {
    try{
        const personID = req.params.id;
        const updatePersonData = req.body;
        const response = await Person.findByIdAndUpdate(personID, updatePersonData, {
            new: true,
            runValidators: true,
        })

        console.log("Data Updated");
        return res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        return res.status(404).json({error: "Person Not Found!"});
    }
});

//delete perso - DELETE/:id
router.delete("/:id", async (req, res) => {
    try{
        const personID = req.params.id;
        const response = await Person.findByIdAndDelete(personID);

        console.log("data delete");
        return res.status(200).json({message: "Person Deleted Successfully"});

    }
    catch(error){
        console.log(error);
        return res.status(404).json({error: "Person Not Found!"});
    }
})


module.exports = router;