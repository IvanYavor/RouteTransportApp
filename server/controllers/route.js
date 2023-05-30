const Route = require("../models/route");
const Transport = require("../models/transport");
const { createRouteValidate } = require("../utils/validation");

const getTransport = async (id) => {
  return await Transport.findOne({ _id: id });
};

const create = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: "You must provide a body",
    });
  }

  const isValidBody = createRouteValidate(body);
  if (!isValidBody) {
    return res.status(400).json({
      error: "Validation failed",
    });
  }

  const transport = await getTransport(body.transportId);
  if (!transport) {
    return res.status(400).json({
      error: "Transport with transportId does not exist",
    });
  }

  const route = new Route(body);

  if (!route) {
    return res.status(400).json({ error: "Invalid route" });
  }

  try {
    const result = await route.save();

    return res.status(201).json({
      result,
      message: "Route created!",
    });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Failed to create route", error: err.message });
  }
};

const get = async (req, res) => {};

const update = async (req, res) => {};

const deleteRoute = async (req, res) => {};

const apointTransport = async (req, res) => {};

module.exports = {
  create,
  get,
  update,
  deleteRoute,
  apointTransport,
};
