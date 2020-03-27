import * as express from "express";
import * as cors from "cors";
import routes from "./routes";
import { errors } from "celebrate";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);
app.use(errors());

export default app;