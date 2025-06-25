const express = require("express");
const router = express.Router();
const Menu = require("../models/menu");

//add a menu - POST
router.post("/", async (req, res) => {
    try{
        
        const data = req.body;
        const menuItem = await Menu.create(data);
        const response = await menuItem.save();
        console.log("menu item saved");
        return res.status(201).json({message: "Menu Item Created!"});
    }
    catch(error){
        res.status(500).json({error: "Internal Server Error!"});
        console.log(error);
    }

});

//get all menu item - GET
router.get("/", async (req, res) => {
    try{
        const menus = await Menu.find({});
        if(!menus){
            return res.status(400).json({message: "Menus Item Is Empty"});
        }

        console.log("menus item fetched!");
        return res.status(200).json(menus);
    }
    catch(error){
        res.status(500).json({error: "Internal Server Error!"});
        console.log(error);
    }
    
});

//get menu by id - GET/:id
router.get("/:id", async (req, res) => {
    try{
        const menuId = req.params.id;
        const menu = await Menu.findById(menuId);
        console.log("menu item is fetched with unique id");
        return res.status(200).json(menu);    
    
    }
    catch(error){
        res.status(404).json({error: "Menu Item Not Found!"});
        console.log(error);
    }
  
});

//update menu by id - PUT/:id

router.put("/:id", async (req, res) => {
    try{    
        const id = req.params.id;
        const data = req.body;

        const newMenu = await Menu.findByIdAndUpdate(id, data, {new: true});
        console.log("menu item is updated");
        return res.status(200).json(newMenu);
    }
    catch(error){
        res.status(404).json({error: "Menu Item Not Found!"});
        console.log(error);
    }
})

//delet menu by id - DELETE/:id
router.delete("/:id", async (req, res) => {
    try{
        const id = req.params.id;
        const menu = await Menu.findByIdAndDelete(id);

        console.log("menu deleted!");
        return res.status(200).json({message: "Menu Deleted From Database"});
    }
    catch(error){
        res.status(404).json({error: "Menu Item Not Found!"});
        console.log(error);
    }
});

module.exports = router;
