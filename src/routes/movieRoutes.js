import express from "express";

const router = express.Router();

router.get("/hello", (req, res) => {
  res.json({ message: "contact route is running......." });
});

router.post("/hello", (req, res) => {
  res.json({ message: "contact post route is running......." });
});

router.put("/hello", (req, res) => {
  res.json({ message: "contact put route is running......." });
});

router.delete("/hello", (req, res) => {
  res.json({ message: "contact delete route is running......." });
});

export default router;