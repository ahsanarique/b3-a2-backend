import config from "../app/config";
import mongoose from "mongoose";
import app from "./app";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port ? config.port : 3000, () => {
      console.log(`e-commerce app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();