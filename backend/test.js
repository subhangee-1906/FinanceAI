const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://financeuser:FinanceAI123@cluster0.widznnj.mongodb.net/financeai?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    const client = new MongoClient(uri);

    await client.connect();

    console.log("CONNECTED SUCCESSFULLY");

    await client.close();
  } catch (err) {
    console.error(err);
  }
}

run();