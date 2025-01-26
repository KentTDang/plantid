const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();
const port = 8080;

// mmiddleware
app.use(bodyParser.json({limit: '420mb'}));
app.use(bodyParser.urlencoded({limit: '420mb', extended: true}));
app.use(cors({ origin: '*' })); // For testing only; restrict origins in production
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

// mongoDB connection
const username = encodeURIComponent("ktd6900");
const password = encodeURIComponent("uCLvye364apCXXgt");
const MONGOURL = `mongodb+srv://${username}:${password}@plantid.ca6q0.mongodb.net/plantlist?retryWrites=true&w=majority&appName=Plantid`;

(async () => {
  try {
    await mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
})();


const plantScheme = new mongoose.Schema({
    title: String,
})

const plantImageScheme = new mongoose.Schema({
    image: String, // Change from Number to String to store base64
    filename: String, // File name of the image
  });
  

const Plant = mongoose.model("Plant", plantScheme)
const plantImageSchema = new mongoose.Schema({
  image: String,  // This will be the Firebase download URL
  filename: String,
});
const PlantImage = mongoose.model("PlantImage", plantImageSchema);

// Create a plant
app.post('/plants', async(req,res) => {
    console.log("Hit index post server")
    console.log(req)
    console.log(res)
    try {
        const newPlant = new Plant(req.body);
        await newPlant.save();
        res.status(201).json(newPlant);
     } catch (error) {
        res.status(400).json({message:error.message})
     }
})

app.post('/plantsImage', async (req, res) => {
  console.log("Plants Image");
  try {
    // Here we expect 'image' to be the Firebase URL
    // not base64 data.
    const newPlantImage = new PlantImage({
      image: req.body.image,    // A public URL from Firebase
      filename: req.body.filename,
    });
    await newPlantImage.save();
    res.status(201).json(newPlantImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
  

// Read a plant
app.get('/plants', async(req,res) => {
 try {
    const plants = await Plant.find();
    res.json(plants);
 } catch (error) {
    res.status(500).json({message:error.message})
 }
})

// Update a plant
app.put('/plants/:id', async(req,res) => {
    try {
        const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json(updatedPlant)
    } catch (error){
        res.status(400).json({message:error.message})
    }
})

// Delete a plant
app.delete('/plants/:id', async(req,res) => {
    try {
        await Plant.findByIdAndDelete(req.params.id)
        res.json({message: "Plant deleted!"})
    } catch(error) {
        res.status(500).json({message:error.message})
    }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
