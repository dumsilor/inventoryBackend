const mongoose = require('mongoose');


const inventoryDB = mongoose.createConnection('mongodb://localhost:27017/inventoryDB');
const menuDB = mongoose.createConnection('mongodb://localhost:27017/menuDB');
const authDB = mongoose.createConnection('mongodb://localhost:27017/authDB');


    
const itemSchema = new mongoose.Schema({
    itemName: String,
    itemAmount: Number,
    itemUnit: String,
    itemCurrentPrice: Number,
});

const menuItemSchema = new mongoose.Schema({
    itemName: String,
    itemRawPrice: Number,
    itemLocalPrice: Number,
    itemFoodPandaPrice: Number,
    imgPath: String,
    ingredients: Array,
})

const ingredientItemSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    unit: String
});

const authSchema = new mongoose.Schema({
    userName: String,
    password: String,
})

const RawItem = inventoryDB.model('rawItem',itemSchema)
const FrozenItem = inventoryDB.model('frozenItem',itemSchema);
const DryItem = inventoryDB.model("dryItem",itemSchema);
const PackagingItem = inventoryDB.model("packagingItem",itemSchema);
const BeverageItem = inventoryDB.model('beverageItem',itemSchema);
const CleaningProductItem = inventoryDB.model('cleaningProductItem',itemSchema);
const UtencilItem = inventoryDB.model('utencilItem',itemSchema);
const ContingencyItem = inventoryDB.model('cotingencyItem',itemSchema)

const MenuItem = menuDB.model('menuItem',menuItemSchema)

const Authentication = authDB.model('auth',authSchema);

module.exports = {
    RawItem,
    FrozenItem,
    DryItem,
    PackagingItem,
    BeverageItem,
    CleaningProductItem,
    UtencilItem,
    ContingencyItem,
    MenuItem,
    Authentication
}