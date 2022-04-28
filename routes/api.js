const router = require("express").Router();
const User = require("../models/user")

// route that will get all the users in the database
router.get("/api/all", (req, res) => {
    User.find({})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

// route that will add a new User

module.exports = router;