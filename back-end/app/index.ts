import app from "./app";
import { bold, green, cyan, magenta, gray, yellow, red, blue } from "colorette";
import sequelize from "./db-config";
import { seed } from "./seed";
import { initForeignKey } from "./models";

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
} 
  const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(bold(green("\n🚀✨ Your API is live! ✨🚀")));
  console.log(cyan(`📡 Listening on: http://localhost:${process.env.PORT}`));
  console.log(green(`📘 Swagger docs at http://localhost:${process.env.PORT}/api-docs`));
  console.log(
    magenta(`📦  ${process.env.PROJECT_NAME} backend is ready to serve!`)
  );
  console.log(gray("-------------------------------------------\n"));
  // Connection au base de données
  sequelize.authenticate()
  .then(() => {
    console.log("\n===============================================");
    console.log(cyan("💾 Database Connection Established Successfully!"));
    console.log(
      `${yellow("🕒 Time       :")} ${green(new Date().toLocaleString())}`
    );
    console.log("===============================================\n");
  })
  .catch((err: any) => {
    console.log("\n===============================================");
    console.log(red("❌ Database Connection Failed!"));
    console.log(`${yellow("🧠 Reason     :")} ${magenta(err.message)}`);
    console.log(
      `${yellow("🕒 Time       :")} ${cyan(new Date().toLocaleString())}`
    );
    console.log("===============================================\n");
    process.exit(1);
  });

  sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Tables synced')
    console.log("===============================================\n");
    console.log(blue("💾 Init db..."));
    initForeignKey();

    console.log("===============================================\n");
    console.log(yellow("💾 Seeding some data..."));
    await seed();
    console.log(green("Seed finished"));
  })
  .catch(err => console.error('Sync error:', err));
});