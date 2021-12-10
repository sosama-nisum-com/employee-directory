const { Employee, validate } = require("../models/Employee");
const express = require("express");
const router = express.Router();
const { upload } = require("../utils/upload");
const util = require("util");
const fs = require("fs");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

router.get("/", async (req, res) => {
  const employees = await Employee.find({});
  res.send(employees);
});

router.get("/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) res.status(404).send("Employee doesn't exist");

  res.send(employee);
});

router.post("/", upload.single("image"), async (req, res) => {
  const { error } = validate({ ...req.body });

  if (error) return res.status(400).send(error.details[0].message);

  if (!req.file) return res.status(400).send("Upload atleast one image.");

  let employee = await Employee.findOne({ email: req.body.email });
  if (employee) return res.status(400).send("Employee already exists.");

  try {
    employee = new Employee({ ...req.body, image: req.file?.filename });
    await employee.save();

    const file = await readFile(req.file.path);
    await writeFile(`./uploads/${req.file.filename}`, file);

    res.send(employee);
  } catch (ex) {
    res.status(500).send("Something went wrong");
  }
});

module.exports = router;
