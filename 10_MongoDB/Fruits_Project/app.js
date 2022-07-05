const {
  MongoClient
} = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  useUnifiedTopology: true
});

async function run() {
  try {
    await client.connect();
    console.log("Connected Successfully to server");

    const database = client.db("fruitsDB");
    const fruitsCollection = database.collection("fruits");

    // create an array of documents to insert
    const docs = [{
        name: "apple",
        healthy: true
      },
      {
        name: "orange",
        healthy: true
      },
      {
        name: "banana",
        healthy: true
      },
    ];

    // this option prevents additional documents from being inserted if one fails
    const options = {
      ordered: true
    };

    const result = await fruitsCollection.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);

    const cursor = fruitsCollection.find({});

    if ((await cursor.countDocuments) === 0) {
      console.log("No documents found!");
    }

    await cursor.forEach((fruit) => {
      console.log(fruit);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
