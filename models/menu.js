const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
    name:{
        type: "String",
        required: true, 
    },
    
    price: {
        type: Number,
        required: true,
    },

    taste: {
        type: String,
        required: true,
        enum: ["sour", "sweet", "spicy"],
    },

    is_drink: {
        type: Boolean,
        default: false,
    },

    ingredients:{
        type: [String],
        default: [],
    },

    num_sales:{
        type: Number,
        default: 0,
    }

});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;