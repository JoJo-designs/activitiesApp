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
// router.post('/api/login', async ( req, res ) => {
//     console.log(req.body)
//         try {
//             const userData = await Activity.findOne({ where: {email: req.body.userName} });
//             console.log(userData)
//         }
//         catch (err) {
//             res.status(400).json(err)
//         }
// })


// router.post('/api/login', ( req, res ) => {
//     console.log(req.body)
//        Activity.findOne({ where: {email: req.body.email} })
//        .then(data => {
//            res.json(data)
//        })
//        .catch(err => {
//            res.status(400).json(err)
//        })
// })

router.post('/api/login', async (req, res) => {
    console.log(req.body)
    try {
        const userData = await Activity.findOne({ where: { email: req.body.email } });
        console.log(userData)
        if (!userData) {
            res
            .status(400)
            console.log("wrong data\n")
            .json({ message: 'incorrect email or password, please try again' });
            return;
        }
        
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.json(400)
            console.log("wrong password\n")
            .json({ message: 'incorrect email or password, please try again' });
            return;
        }

    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;