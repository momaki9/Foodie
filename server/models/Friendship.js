const { Schema, model } = require("mongoose");

const friendshipSchema = new Schema(
    {
        userA: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        userB: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        requestedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected", "blocked"],
            default: "pending"
        },
        acceptedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

friendshipSchema.index(
    { userA: 1, userB: 2 },
    { unique: true }
);

friendshipSchema.index({ status: 1 })

const Friendship = model("Friendship", friendshipSchema);
module.exports = Friendship;