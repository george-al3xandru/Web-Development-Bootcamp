const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB');

  // The fruit schema
  const fruitSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please check your fruit. No name has been specified!"]
    },
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    review: String
  });

  const Fruit = new mongoose.model("Fruit", fruitSchema);

  const fruit = new Fruit({
    name: "Apple",
    rating: 7.0,
    review: "It's a pretty solid fruit"
  });

  await fruit.save(); // insert one item into the collection

  mongoose.connection.close(); // close the mongoose connection
}
