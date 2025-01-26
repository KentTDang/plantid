const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
const port = 3000;

// mmiddleware
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '420mb'}));
app.use(bodyParser.urlencoded({limit: '420mb', extended: true}));
app.use(cors());

// mongoDB connection
const username = encodeURIComponent("ktd6900");
const password = encodeURIComponent("uCLvye364apCXXgt");
const MONGOURL = `mongodb+srv://${username}:${password}@plantid.ca6q0.mongodb.net/plantlist?retryWrites=true&w=majority&appName=Plantid`;

try {
    mongoose.connect(MONGOURL);
    console.log("Connected to mongoDB");
} catch(error) {
    console.error(error)
}

const plantScheme = new mongoose.Schema({
    title: String,
})

const plantImageScheme = new mongoose.Schema({
    image: String, // Change from Number to String to store base64
    filename: String, // File name of the image
  });
  

const Plant = mongoose.model("Plant", plantScheme)
const PlantImage = mongoose.model("PlantImages", plantImageScheme)

// Create a plant
// app.post('/plants', async(req,res) => {
//     console.log("Hit index post server")
//     console.log(req)
//     console.log(res)
//     try {
//         const newPlant = new Plant(req.body);
//         await newPlant.save();
//         res.status(201).json(newPlant);
//      } catch (error) {
//         res.status(400).json({message:error.message})
//      }
// })

app.post('/plants', async (req, res) => {
    console.log(req.body)
    try {
      const newPlantImage = new PlantImage({
        image: req.body.image, // Base64 image data
        filename: req.body.filename, // Filename
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

app.use((req) => console.log(req));

app.listen(port, () => {
    console.log("Server is running on", port);
})