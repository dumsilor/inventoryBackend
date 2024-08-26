async function authenticateUser(dbModel,body,res){
    await dbModel.findOne({userName: body.userName}).then((user)=>{
        
        if (user === null){
            res.send("USER_NOT_EXISTING")
        } else if (user.password===body.password){
            res.send("AUTHENTICATED")
        } else{
            res.send("INVALID_PASSWORD")
        }
    }).catch((err)=>{
        res.send(err)
    })
}

module.exports= {
    authenticateUser
}