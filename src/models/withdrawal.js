const mongoose = require("mongoose");
//loading our validator package
const validator = require("validator");

const withdrawalSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    plan: {
      type: String,
      trim: true,
      required: true
    },
    payout: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 2000) {
          throw new Error("Payout amount cannot be less than 2000");
        }
      }
    },
    status: {
      type: String,
      default: "processing"
    }
  },
  {
    timestamps: true
  }
);

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);

module.exports = Withdrawal;
