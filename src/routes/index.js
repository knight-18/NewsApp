const { response } = require("express");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
    res.render("index")
});

router.get("*", async (req, res)=>{
    res.status(404).send("Invalid Page")
})



module.exports = router
