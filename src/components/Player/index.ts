import { GameObjects, Input, Math, Scene } from "phaser";

export class Player {
  public character?: GameObjects.Rectangle;
  private health: number;

  constructor(private scene: Scene) {
    this.health = 100;
  }

  create() {
    this.character = this.scene.add.rectangle(400, 300, 10, 10, 0xababab);
    this.scene.physics.world.enable(this.character);
  }

  get position() {
    if (!this.character) return { x: 0, y: 0 };
    return { x: this.character.x, y: this.character.y };
  }

  get life() {
    return this.health;
  }

  damage(amount: number) {
    this.health -= amount;
  }

  trackPointer(pointer: Input.Pointer) {
    if (this.character) {
      const angle = Math.Angle.Between(
        this.character.x,
        this.character.y,
        pointer.worldX,
        pointer.worldY
      );

      this.character.rotation = angle;
    }
  }

  move(x: number, y: number) {
    if (this.character) {
      if (x !== 0) {
        this.character.x += x;
      }
      if (y !== 0) {
        this.character.y += y;
      }
    }
  }
}
