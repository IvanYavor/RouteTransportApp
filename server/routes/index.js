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

// transports
router.get("/transport", Transport.get);
router.post("/transport", Transport.create);
router.get("/transports", Transport.list);
router.patch("/transport", Transport.update);
router.delete("/transport", Transport.deleteTransport);

module.exports = router;
