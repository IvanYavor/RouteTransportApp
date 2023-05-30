const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const Route = require("../models/route");
const Transport = require("../models/transport");

const { createRouteValidate } = require("../utils/validation");

const getTransport = async (id) => {
  return await Transport.findOne({ id });
};

const create = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: "You must provide a body",
    });
  }

  // TODO validation
  const isValidBody = createRouteValidate(body);
  if (!isValidBody) {
    return res.status(400).json({
      error: "Validation failed",
    });
  }

  // TODO need to check that transport with transportId exists
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

  const result = await route.save();

  return res.status(201).json({
    result,
    message: "Route created!",
  });
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
