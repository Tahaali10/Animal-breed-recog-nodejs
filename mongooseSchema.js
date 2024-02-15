const mongoose = require("mongoose")

const MySchema = mongoose.Schema({
    id: { type: Number },
    breed: { type: String },
    live_weight: { type: Number },
    animal_image: { type: String }
});
const animalBreed=mongoose.model("animalBreeds",MySchema)

module.exports=animalBreed;

