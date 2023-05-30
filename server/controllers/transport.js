const Transport = require("../models/transport");
const { createTransportValidate } = require("../utils/validation");

const getTransportByPlateNumber = async (plateNumber) => {
  return await Transport.findOne({ plateNumber });
};

const create = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: "You must provide a body",
    });
  }

  const isValidBody = createTransportValidate(body);
  if (!isValidBody) {
    return res.status(400).json({
      error: "Validation failed",
    });
  }

  // TODO check if transport already exists
  const existingTransport = await getTransportByPlateNumber(body.plateNumber);
  if (existingTransport)
    return res
      .status(400)
      .json({ error: "Transport with that plate number already exists." });

  const transport = new Transport(body);

  if (!transport) {
    return res.status(400).json({ error: "Invalid transport" });
  }

  try {
    const result = await transport.save();

    return res.status(201).json({
      result,
      message: "Transport created!",
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Failed to create transport", error: err.message });
  }
};

const get = async (req, res) => {};

const list = async (req, res) => {};

module.exports = {
  create,
  get,
  list,
};
