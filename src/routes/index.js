const { response } = require("express");
const express = require("express");
const router = express.Router();

const adminRoutes = require("./admin")
const userRoutes = require("./user")

router.use("/admin", adminRoutes)
router.use("/user", userRoutes)

router.get("/", async (req, res) => {
    res.render("index")
});

router.get("*", async (req, res)=>{
    res.status(404).send("Invalid Page")
})



module.exports = router
