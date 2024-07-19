import express from "express";

const router = express.Router();

const users = [
  {
    name: "yahia",
    password: "1234",
  },
  {
    name: "ammar",
    password: "4567",
  },
];

router.use((req, res, next) => {
  // res.sendStatus(404);
  next();
  console.log(`${req.ip}\t${req.method}\t${req.url}\t${req.headers}`);
});


router.route("/")
  .get((req, res) => {
  res.json(users);
  })
  .post(async (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
  });

// PUT
router.route("/:name")
  .patch((req, res) => {
    const user = users.findIndex((u) => u.name == req.params.name);
    if (user > -1) {
      users[user] = { ...users[user], ...req.body };
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  })
  .delete((req, res) => {
    res.send("NO");
  });

export default router;
