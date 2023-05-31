const Transport = require("../models/transport");
const Route = require("../models/route");
const {
  createTransportValidate,
  updateTransportValidate,
  validateId,
} = require("../utils/validation");

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

const get = async (req, res) => {
  const body = req.body;

  const isValid = validateId(body.id);
  if (!isValid) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const transport = await Transport.findOne({ _id: body.id });
    return res.status(200).json({ transport });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Failed to get transport", error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const transports = await Transport.find({ __v: 0 });
    return res.status(200).json({ transports });
  } catch (err) {
    return res.status(400).json({
      message: "Failed to get list of transports",
      error: err.message,
    });
  }
};

const update = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: "You must provide a body",
    });
  }

  const isValidBody = updateTransportValidate(body);
  if (!isValidBody) {
    return res.status(400).json({
      error: "Validation failed",
    });
  }

  try {
    const id = body.id;
    delete body.id;
    const transport = await Transport.findOneAndUpdate({ _id: id }, body);
    return res.status(200).json({ transport });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Failed to update transport", error: err.message });
  }
};

const deleteTransport = async (req, res) => {
  const body = req.body;

  const isValid = validateId(body.id);
  if (!isValid) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const transportExist = await Transport.findOne({ _id: body.id });
  if (!transportExist) {
    return res.status(400).json({
      error: "Transport does not exist",
    });
  }

  try {
    const deleted = await Transport.findOneAndDelete({ _id: body.id });

    await Route.updateMany({ transportId: deleted._id }, { transportId: null });
    return res.status(204).json({
      route: deleted,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = {
  create,
  get,
  list,
  update,
  deleteTransport,
};
