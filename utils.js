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

module.exports = {
    getMaterial,
    addMaterial,
    deleteMaterial,
    updateMaterial
}