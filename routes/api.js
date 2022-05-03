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

// Route adds a new User to the api
router.post("/api/add", ({ body }, res) => {
    Activity.create(body)
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

//Route that will login existing User
router.get("/login", async(req, res) => {
    console.log(req.body)
    try{
        const userDate = await User.findOne({email: req.body.email});
        if (!userData) {
            res.status(400)
            console.log("wrong")
            .json({message: 'incorrect email or password try again'})
            return;
        }

        const validPassword = await userDate.checkPassword(req.body.password);

        if (!vaildPassword) {
            res.json(400)
            console.log("wrong")
            .json({message: 'incorrect email or password try again'})
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true
            res.json({message: 'logged in succesful'})
        })

        } catch(err) {
            res.status(204).end();
        }
});

module.exports = router;