import { Input, Scene } from "phaser";
import { Debug } from "../components/Debug";
import { Enemy } from "../components/Enemy";
import { Keyboard } from "../components/Keyboard";
import { Player } from "../components/Player";
import { Pointer } from "../components/Pointer";
import { Table } from "../components/Table";

export class GameScene extends Scene {
  private player = new Player(this);
  private pointer = new Pointer(this);
  private debug = new Debug(this);
  private keyboard = new Keyboard(this);
  private table = new Table(this, this.player);
  private enemy = new Enemy(this, this.player);

  preload() {}

  create() {
    this.enemy.create();
    this.player.create();
    this.pointer.create();
    this.keyboard.create();
    this.table.create();

    this.enemy.setup();

    this.input.on(Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.input.on(Input.Events.POINTER_MOVE, this.onPointerMove, this);

    this.debug.create();
  }

  update(time: number, delta: number): void {
    super.update(time, delta);

    this.debug.update(time);
    this.table.update();
    this.enemy.update(time, delta);

    this.keyboard.movePlayer(this.player, 0.5);
  }

  onPointerDown(pointer: Input.Pointer) {
    console.log("player attack to", pointer.worldX, pointer.worldY);
  }

  onPointerMove(pointer: Input.Pointer) {
    this.player.trackPointer(pointer);
    this.pointer.trackPointer(pointer);
  }
}
