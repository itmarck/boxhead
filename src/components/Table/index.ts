import { GameObjects, Scene } from "phaser";
import { Player } from "../Player";

export class Table {
  private playerLife: GameObjects.Text;

  constructor(private scene: Scene, private player: Player) {
    this.playerLife = GameObjects.Text.prototype;
  }

  create() {
    this.playerLife = this.scene.add.text(700, 10, "", {
      color: "#808080",
      fontFamily: "Helvetica",
      fontStyle: "bold",
    });
  }

  update() {
    this.playerLife.setText(`${this.player.life} Points`);
  }
}
