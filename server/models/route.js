const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Route = new Schema({
  startCity: { type: Schema.Types.String, required: true },
  endCity: { type: Schema.Types.String, required: true },
  distance: { type: Schema.Types.Number, required: true },
  dispatchDate: { type: Schema.Types.Date, required: true },
  executionDate: { type: Schema.Types.Date, required: true },
  transportType: {
    type: Schema.Types.String,
    enum: ["CAR", "TRUCK"],
    required: true,
  },
  expectedPay: { type: Schema.Types.Number, required: true },
  transportId: { type: Schema.Types.ObjectId, ref: "transport" },
  status: {
    type: Schema.Types.String,
    enum: ["WAITING", "EXECUTING", "DONE"],
    required: true,
  },
});

module.exports = mongoose.model("route", Route);
