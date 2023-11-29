import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    nickname: {type: String, required: true},
    custodyAccountPublicKey: {type: String, required: true},
    custodyAccountPrivateKey: {type: String, required: true},
    lastClaimed: {type: Date, required: true},
    nextClaim: {type: Date, required: true},
})

export default  mongoose.models.User || mongoose.model("User", userSchema) 