import "dotenv/config";
import { loadEnv } from "./config/env.js";
import { createApp } from "./app.js";

const env = loadEnv();
const app = createApp();

app.listen(env.PORT, () => {
  console.log(`API corriendo en puerto ${env.PORT} [${env.NODE_ENV}]`);
});

export default app;
