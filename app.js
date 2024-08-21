const bodyParser = require("body-parser");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors())

app.use(bodyParser.json());

const inventoryDB = mongoose.createConnection('mongodb://localhost:27017/inventoryDB');
const menuDB = mongoose.createConnection('mongodb://localhost:27017/menuDB');

    
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
const ingredient = menuDB.model('ingredient',ingredientItemSchema)

function getMaterial(dbModel){
    return dbModel.find().then((items)=>{
         return items
    }).catch((err)=>{
        console.log(err)
        throw err
    })
}

async function addMaterial(dbModel,body,res){
    const newMaterial = new dbModel(body)
            try{
                await newMaterial.save()
                res.status(200).send(200)
            } catch(error){
                console.log(error)
                res.status(401).send("Error writing Data")
            } 
}

async function deleteMaterial(dbModel,body,res){
    await dbModel.deleteOne({_id: body._id})
            .then(()=> res.status(200).send("User Deleted \n" + body ))
            .catch((err)=>res.status(401).send(err))
}

async function updateMaterial(dbModel,body,res){
    await dbModel.findOneAndUpdate({_id: body._id},{
            itemName: body.itemName,
            itemAmount: body.itemAmount,
            itemUnit: body.itemUnit,
            itemCurrentPrice: body.itemCurrentPrice
              }).then(()=> 
                    res.status(200).send(200)).catch((err)=>res.send(err))
}

app.get('/menu', (req,res)=>{
    getMaterial(MenuItem).then((items)=>res.send(items)).catch((err)=>res.status(500).send(err))
})

app.get('/inventory/:materialName',(req,res)=>{
    switch(req.params.materialName){
        case('rawmaterial'):
            getMaterial(RawItem).then((items)=>res.send(items)).catch((err)=>res.status(500).send(err))
            // RawItem.find().then((items)=>{
            //     res.send(items)
            // }).catch((err)=>{
            //     res.send(err)
            //     console.log(err)
            // })
            break;
            case('drystocks'):
                getMaterial(DryItem).then((items)=>res.send(items)).catch((err)=>res.status(500).send(err))
                break;
            case('frozen'):
                getMaterial(FrozenItem).then((items)=>res.send(items)).catch((err)=>res.status(500).send(err))
                break;
            case('packaging'):
                getMaterial(PackagingItem).then((items)=>res.send(items)).catch((err)=>res.status(500).send(err))
                break;
            case('beverage'):
                getMaterial(BeverageItem).then((items)=>res.send(items)).catch((err)=>res.status(500).send(err))
                break;
            case('cleaningproducts'):
                getMaterial(CleaningProductItem).then((items)=>res.send(items)).catch((err)=>res.status(500).send(err))
                break;
            case('utencils'):
                getMaterial(UtencilItem).then((items)=>res.send(items)).catch((err)=>res.status(500).send(err))
                break;
            case('contingencystock'):
                getMaterial(ContingencyItem).then((items)=>res.send(items)).catch((err)=>res.status(500).send(err))
                break;
    }//switch end
})//get end

app.post('/inventory/:materialName',(req,res)=>{
    // testItem = 
    // {
    //     itemName: "Chicken Breast",
    //     itemAmount: 1000,
    //     itemUnit: "gm",
    //     itemCurrentPrice: 400,
    // }
    // res.send("request Received")
    // console.log("Request Received")
    // console.log(req.body)
    switch(req.params.materialName){
        case('rawmaterial'):
            addMaterial(RawItem,req.body,res)
            // const newMaterial = new RawItem(req.body)
            // try{
            //     newMaterial.save()
            //     res.status(200).send(200)
            // } catch(error){
            //     console.log(error)
            //     res.status(401).send("Error writing Data")
            // }
            break;
        case('drystocks'):
            addMaterial(DryItem,req.body,res)
            break;
        case('frozen'):
            addMaterial(FrozenItem,req.body,res)
            break;
        case('packaging'):
            addMaterial(PackagingItem,req.body,res)
            break;
        case('beverage'):
            addMaterial(BeverageItem,req.body,res)
            break;
        case('cleaningproducts'):
            addMaterial(CleaningProductItem,req.body,res)
            break;
        case('utencils'):
            addMaterial(UtencilItem,req.body,res)
            break;
        case('contingencystock'):
            addMaterial(ContingencyItem,req.body,res)
            break;
    }
})//add post end

app.post('/inventory/:materialName/delete',(req,res)=>{
    switch(req.params.materialName){
        case('rawmaterial'):
            deleteMaterial(RawItem,req.body,res)
            // RawItem.deleteOne({_id: req.body._id})
            // .then(()=> res.status(200).send("User Deleted \n" + req.body ))
            // .catch((err)=>res.status(401).send(err))
            break;
        case('drystocks'):
        deleteMaterial(DryItem,req.body,res)
            break;
        case('frozen'):
            deleteMaterial(FrozenItem,req.body,res)
            break;
        case('packaging'):
            deleteMaterial(PackagingItem,req.body,res)
            break;
        case('beverage'):
            deleteMaterial(BeverageItem,req.body,res)
            break;
        case('cleaningproducts'):
            deleteMaterial(CleaningProductItem,req.body,res)
            break;
        case('utencils'):
            deleteMaterial(UtencilItem,req.body,res)
            break;
        case('contingencystock'):
            deleteMaterial(ContingencyItem,req.body,res)
            break;
    }//switch end
})//Delete Post end

app.post('/inventory/:materialName/update',(req,res)=>{
    console.log(req.body);
    switch(req.params.materialName){
        case('rawmaterial'):
            updateMaterial(RawItem,req.body,res)
            // RawItem.findOneAndUpdate({_id: req.body._id},{
            //     itemName: req.body.itemName,
            //     itemAmount: req.body.itemAmount,
            //     itemUnit: req.body.itemUnit,
            //     itemCurrentPrice: req.body.itemCurrentPrice
            // }).then(()=> 
            // res.status(200).send(200)).catch((err)=>res.send(err))
            break;
        case('drystocks'):
            updateMaterial(DryItem,req.body,res)
            break;
        case('frozen'):
            updateMaterial(FrozenItem,req.body,res)
            break;
        case('packaging'):
            updateMaterial(PackagingItem,req.body,res)
            break;
        case('beverage'):
            updateMaterial(BeverageItem,req.body,res)
            break;
        case('cleaningproducts'):
            updateMaterial(CleaningProductItem,req.body,res)
            break;
        case('utencils'):
            updateMaterial(BeverageItem,req.body,res)
            break;
        case('contingencystock'):
            updateMaterial(ContingencyItem,req.body,res)
            break;
    }
})//Update post end



app.listen(3000, ()=>{
    console.log("App is running on server port 3000")
})


