const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transport = new Schema({
  plateNumber: { type: Schema.Types.String, required: true },
  status: {
    type: Schema.Types.String,
    enum: ["AVAILABLE", "UNAVAILABLE"],
    required: true,
  },
  model: { type: Schema.Types.String, required: true },
  purchaseDate: { type: Schema.Types.Date, required: true },
  mileage: { type: Schema.Types.Number, required: true },
  type: { type: Schema.Types.String, enum: ["CAR", "TRUCK"], required: true },
});

module.exports = mongoose.model("transport", Transport);
