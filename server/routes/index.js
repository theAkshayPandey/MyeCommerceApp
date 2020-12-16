const express = require("express");

const authRoutes = require("./auth.route");

const cartRoutes = require("./cart");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/cart", cartRoutes);
module.exports = router;
