const express = require("express");

const Transport = require("../controllers/transport");
const Route = require("../controllers/route");

const router = express.Router();

// routes
router.get("/routes", Route.get);
router.post("/routes", Route.create);
router.put("/routes/:routeId", Route.update);
router.delete("/routes/:routeId", Route.deleteRoute);
router.post("/routes/:routeId/tranports/:tranportId", Route.apointTransport);

// transports
router.get("/transports", Transport.get);
router.post("/transports", Transport.create);

module.exports = router;
