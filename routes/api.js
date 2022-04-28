const router = require("express").Router();
const Activity = require("../model")

// route that will get all the users in the database
router.get("/api/all", (req, res) => {
    Activity.find({})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

// route that will add a new User

router.post("/api/add", ({ body }, res) => {
    Activity.create(body)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).json(err)
    })
})


module.exports = router;