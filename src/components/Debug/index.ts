import { GameObjects, Math, Scene } from "phaser";

export class Debug {
  private fps?: GameObjects.Text;

  constructor(private scene: Scene) {}

  create() {
    if (this.scene.physics.config.debug) {
      this.fps = this.scene.add.text(10, 10, "0 FPS", { color: "#ff5533" });
    }
  }

  update(time: number) {
    if (Math.RoundTo(time % 60) === 0) {
      const actualFps = Math.RoundTo(this.scene.game.loop.actualFps);
      this.fps?.setText(`${actualFps} FPS`);
    }
  }
}
