const express = require("express");

const Tranport = require("../controllers/transport");
const Route = require("../controllers/route");

const router = express.Router();

// routes
router.get("/routes", Route.get);
router.post("/routes", Route.create);
router.put("/routes/:routeId", Route.update);
router.delete("/routes/:routeId", Route.deleteRoute);
router.post("/routes/:routeId/tranports/:tranportId", Route.apointTransport);

// transports
router.get("/trasports", Tranport.get);
router.post("/trasports", Tranport.create);

module.exports = router;
