import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    nickname: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    custodyAccountPublicKey: {type: String, required: true},
    custodyAccountPrivateKey: {type: String, required: true},
    lastClaimed: {type: Number, required: true},
    nextClaim: {type: Number, required: true},
})

export default   mongoose.model("User", userSchema) || mongoose.models.User