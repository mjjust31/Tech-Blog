const router = require("express").Router();



const apiRoutes = require("./api/");
const homePage = require("./homePage.js");
const dashboard = require("./dashboard.js")


router.use("/api", apiRoutes);
router.use("/", homePage);
router.use('/dashboard', dashboard)



module.exports = router;
