import { GameObjects, Input, Scene } from "phaser";

export class Pointer {
  private pointer?: GameObjects.Arc;

  constructor(private scene: Scene) {}

  create() {
    this.pointer = this.scene.add.circle(0, 0, 2, 0xff0000);

    this.scene.game.canvas.style.cursor = "none";
  }

  trackPointer(pointer: Input.Pointer) {
    if (this.pointer) {
      this.pointer.setPosition(pointer.worldX, pointer.worldY);
    }
  }
}
