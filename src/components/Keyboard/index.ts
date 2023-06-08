import { Input, Scene } from "phaser";
import { Player } from "../Player";

export type MovementKeys = {
  up: Input.Keyboard.Key;
  left: Input.Keyboard.Key;
  down: Input.Keyboard.Key;
  right: Input.Keyboard.Key;
};

export class Keyboard {
  private cursorKeys?: MovementKeys;

  constructor(private scene: Scene) {}

  create() {
    this.cursorKeys = this.scene.input.keyboard?.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as MovementKeys;
  }

  movePlayer(player: Player, velocity: number = 0.5) {
    if (this.cursorKeys) {
      if (this.cursorKeys.left.isDown) {
        player.move(-velocity, 0);
      }
      if (this.cursorKeys.right.isDown) {
        player.move(velocity, 0);
      }
      if (this.cursorKeys.up.isDown) {
        player.move(0, -velocity);
      }
      if (this.cursorKeys.down.isDown) {
        player.move(0, velocity);
      }
    }
  }
}
