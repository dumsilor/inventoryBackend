const bodyParser = require("body-parser");
const express = require('express');
const cors = require('cors');

const {getMaterial} = require('./utils.js');
const {addMaterial} = require('./utils.js');
const {deleteMaterial} = require('./utils.js');
const {updateMaterial} = require('./utils.js');
const {authenticateUser} = require('./auth.js');

const {RawItem} = require('./db.js')
const {FrozenItem} = require('./db.js')
const {DryItem} = require('./db.js')
const {PackagingItem} = require('./db.js')
const {BeverageItem} = require('./db.js')
const {CleaningProductItem} = require('./db.js')
const {UtencilItem} = require('./db.js')
const {ContingencyItem} = require('./db.js')
const {MenuItem} = require('./db.js')
const {Authentication} = require('./db.js')


const app = express();

app.use(cors())


app.use(bodyParser.json());


app.post('/auth',(req,res)=>{
    console.log(req.body)
    authenticateUser(Authentication,req.body,res);
})

app.get('/menu', (req,res)=>{
    getMaterial(MenuItem).then((items)=>res.send(items)).catch((err)=>res.status(500).send(err))
})

app.get('/inventory/:materialName',(req,res)=>{
    switch(req.params.materialName){
        case('rawmaterial'):
            getMaterial(RawItem).then((items)=>res.send(items)).catch((err)=>res.status(500).send(err))
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
    switch(req.params.materialName){
        case('rawmaterial'):
            addMaterial(RawItem,req.body,res)
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


