const Route = require("../models/route");
const Transport = require("../models/transport");
const {
  createRouteValidate,
  updateRouteValidate,
  validateId,
} = require("../utils/validation");
const { TRANSPORT_AVAILABLE } = require("../utils/constants");

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

  if (transport.status !== TRANSPORT_AVAILABLE) {
    return res.status(400).json({
      error: "This transport is not available",
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

const get = async (req, res) => {
  const id = req.params.id;

  const isValid = validateId(id);
  if (!isValid) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const route = await Route.findOne({ _id: id });
    return res.status(200).json({ data: route });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Failed to get route", error: err.message });
  }
};

const list = async (req, res) => {
  try {
    const routes = await Route.find({ __v: 0 });
    return res.status(200).json({ data: routes });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Failed to get list of routes", error: err.message });
  }
};

const update = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: "You must provide a body",
    });
  }

  const isValidBody = updateRouteValidate(body);
  if (!isValidBody) {
    return res.status(400).json({
      error: "Validation failed",
    });
  }

  if (body.transportId) {
    const transport = await getTransport(body.transportId);
    if (!transport) {
      return res.status(400).json({
        error: "Transport with transportId does not exist",
      });
    }

    if (transport.status !== TRANSPORT_AVAILABLE) {
      return res.status(400).json({
        error: "This transport is not available",
      });
    }
  }

  try {
    const id = body.id;
    delete body.id;
    const route = await Route.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    return res.status(200).json({ route });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Failed to update route", error: err.message });
  }
};

const deleteRoute = async (req, res) => {
  // TODO get id from header
  const id = req.params.id;

  const isValid = validateId(id);
  if (!isValid) {
    return res.status(400).json({ error: "Invalid id" });
  }

  const routeExist = await Route.findOne({ _id: id });
  if (!routeExist) {
    return res.status(400).json({
      error: "Route does not exist",
    });
  }

  try {
    const deleted = await Route.deleteOne({ _id: id });
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
  deleteRoute,
};
