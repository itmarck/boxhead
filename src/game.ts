import { CANVAS, Game, Types } from "phaser";
import { GameScene } from "./scenes/GameScene";
import { Model } from "./shared/model";

const container = document.getElementById("game") as HTMLElement;

const defaultConfiguration: Types.Core.GameConfig = {
  type: CANVAS,
  antialias: true,
  width: 800,
  height: 600,
  backgroundColor: "#fdfdfd",
  parent: container,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
};

interface GameOptions {
  model: Model;
}

export function createGame(options: GameOptions): Game {
  const game = new Game(defaultConfiguration);
  const model = options.model;

  game.registry.set("model", model);

  game.scene.add("game", GameScene);
  game.scene.start("game");

  return game;
}
