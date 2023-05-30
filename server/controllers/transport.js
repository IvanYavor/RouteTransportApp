const mongoose = require("mongoose");

const Transport = require("../models/transport");

const { createTransportValidate } = require("../utils/validation");

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

  const transport = new Transport(body);

  if (!transport) {
    return res.status(400).json({ error: "Invalid transport" });
  }

  const result = await transport.save();

  return res.status(201).json({
    result,
    message: "Transport created!",
  });
};

const get = async (req, res) => {};

module.exports = {
  create,
  get,
};
