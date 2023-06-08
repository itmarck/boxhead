import { createGame } from "./game";
import { Model, loadModel } from "./shared/model";

import "./styles/main.css";

import "./styles/game.css";

loadModel().then((model) => {
  createGame({ model: new Model(model) });
});
