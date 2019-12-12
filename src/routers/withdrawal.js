const Withdrawal = require("../models/withdrawal");
const express = require("express");
const router = express.Router();
// const cors = require("cors");

router.get("/withdrawals", async (req, res) => {
  try {
    const withdrawal = await Withdrawal.find({});
    res.send(withdrawal);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/withdrawals", async (req, res) => {
  const withdrawal = new Withdrawal({
    amount: req.body.amount,
    payout: req.body.payout,
    status: req.body.status
  });
  try {
    await withdrawal.save();

    res.status(201).send({ withdrawal });
  } catch (error) {
    //400: bad request
    res.status(400).send(error.message);
  }
});

/*router.delete("/:id", [auth, admin], async (req, res) => {
  const withdrawal = await Withdrawal.findByIdAndRemove(req.params.id);

  if (!withdrawal)
    return res.status(404).send("The withdrawal with the given ID was not found.");

  res.send(withdrawal);
});*/

router.delete("/withdrawals/:id", async (req, res) => {
  const withdrawal = await Withdrawal.findById(req.params.id);
  if (withdrawal.status === "approved") {
    return res
      .status(400)
      .send(
        `Your withdrawal has been ${withdrawal.status} and cannot be deleted!`
      );
  } else if (withdrawal.status === "declined") {
    return res
      .status(400)
      .send(
        `Your withdrawal has been ${withdrawal.status} and cannot be deleted!`
      );
  }

  try {
    const withdrawal = await Withdrawal.findOneAndDelete({
      _id: req.params.id
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/withdrawals/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const withdrawal = await Withdrawal.findById(req.params.id);
    if (!withdrawal)
      return res
        .status(404)
        .send("The withdrawal with the given ID was not found.");

    res.send(withdrawal);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
