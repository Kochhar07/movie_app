const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    seat_number: {
      type: Number,
      min: 1,
      max: 97,
      required: true,
    },

    is_booked: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Ticket", ticketSchema);
