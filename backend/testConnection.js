const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://financeuser:FinanceAI123@cluster0.widznnj.mongodb.net/financeai?retryWrites=true&w=majority&appName=Cluster0"
)
.then(() => {
  console.log("CONNECTED");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});