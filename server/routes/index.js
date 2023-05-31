const express = require("express");

const Transport = require("../controllers/transport");
const Route = require("../controllers/route");

const router = express.Router();

// routes
router.get("/route/:id", Route.get);
router.get("/routes", Route.list);
router.post("/route", Route.create);
router.patch("/route", Route.update);
router.delete("/route/:id", Route.deleteRoute);

// transports
router.get("/transport/:id", Transport.get);
router.post("/transport", Transport.create);
router.get("/transports", Transport.list);
router.patch("/transport", Transport.update);
router.delete("/transport/:id", Transport.deleteTransport);

module.exports = router;
