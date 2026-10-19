import { createServer } from "node:http";
import { app } from "./app.js";
import { errorHandling } from "./middlewares/error-handling.js";

const port = Number(process.env.PORT) || 3333;
const server = createServer(app);

app.use(errorHandling);

server.listen(port, () => {
  console.info(`API running at http://localhost:${port}`);
});
