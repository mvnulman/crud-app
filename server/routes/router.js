const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

//---------------------------------------------------

// function to add new products
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { image, description, brand, active, date } = req.body;

  if (!image || !description || !brand || active === undefined) {
    res.status(422).json("Por favor, preencher todos os campos!");
  }

  try {
    const addProduct = new users({
      image,
      description,
      brand,
      active,
      date,
    });
    
    await addProduct.save();
    res.status(201).json(addProduct);
    console.log(addProduct);
  } catch (error) {
    res.status(422).json(error);
  }
});

// get product data
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await users.find();
    res.status(201).json(userdata);
    console.log(userdata);
  } catch (error) {
    res.status(422).json(error);
  }
});

// get indivitual product data
router.get("/getproduct/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const individualProduct = await users.findById({ _id: id });
    console.log(individualProduct);
    res.status(201).json(individualProduct);
  } catch (error) {
    res.status(422).json(error);
  }
});

// update product data
router.patch("/updateproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateProduct = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateProduct);
    res.status(201).json(updateProduct);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete product
router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await users.findByIdAndDelete({ _id: id });
    console.log(deleteProduct);
    res.status(201).json(deleteProduct);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
