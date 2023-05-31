const express = require("express");

const Transport = require("../controllers/transport");
const Route = require("../controllers/route");

const router = express.Router();

// routes
router.get("/route", Route.get);
router.get("/routes", Route.list);
router.post("/route", Route.create);
router.patch("/route", Route.update);
router.delete("/route", Route.deleteRoute);
router.post("/route/:routeId/tranports/:tranportId", Route.apointTransport);

// transports
router.get("/transport", Transport.get);
router.post("/transport", Transport.create);

module.exports = router;
