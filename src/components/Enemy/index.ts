import { GameObjects, Math, Scene } from "phaser";
import { cos, sin } from "../../shared/math";
import { Model } from "../../shared/model";
import { Player } from "../Player";

const size = 5;

export class Enemy {
  private element?: GameObjects.Arc;

  private health: number;
  private isAttacking: boolean;
  private attacked = false;

  constructor(private scene: Scene, private player: Player) {
    this.health = 5;
    this.isAttacking = false;
  }

  create() {
    this.element = this.scene.add.circle(100, 100, size, 0x00ff00);
    this.scene.physics.world.enable(this.element);
  }

  setup() {
    if (this.element && this.player.character) {
      this.scene.physics.add.overlap(
        this.element,
        this.player.character,
        () => {
          if (!this.attacked && this.isAttacking) {
            this.player.damage(2);
            this.attacked = true;
          }
        },
        undefined,
        this
      );
    }
  }

  update(_: number, delta: number) {
    const model = this.scene.registry.get("model") as Model;
    const distance = Math.Distance.Between(
      this.position.x,
      this.position.y,
      this.player.position.x,
      this.player.position.y
    );
    const distanceString =
      distance < 20
        ? "together"
        : distance < 40
        ? "close"
        : distance < 60
        ? "middle"
        : "far";
    const actions = model.predict({
      life: this.life,
      friendsClose: false,
      inDanger: false,
      distance: distanceString,
      playerLife: "full",
    });
    const action = actions.length > 0 ? actions[0] : undefined;

    const enemyVelocity = 0.2;
    switch (action) {
      case "go_forward":
        const angle = Math.Angle.Between(
          this.position.x,
          this.position.y,
          this.player.position.x,
          this.player.position.y
        );

        const velocityX = cos(angle) * enemyVelocity * 100;
        const velocityY = sin(angle) * enemyVelocity * 100;

        this.move((velocityX * delta) / 1000, 0);
        this.move(0, (velocityY * delta) / 1000);
        break;
      case "go_back":
        this.move(-enemyVelocity, 0);
        break;
      case "dodge":
        this.move(10, 0);
        break;
      case "attack":
        if (!this.isAttacking) {
          this.isAttacking = true;
          if (this.element) this.element.scale = 3;

          setTimeout(() => {
            if (this.element) this.element.scale = 1;
            this.attacked = false;
          }, 100);

          setTimeout(() => {
            this.isAttacking = false;
          }, 1000);
        }
        break;
      case "call_for_backup":
        console.log("call_for_backup");
        break;
      default:
        break;
    }

    if (this.element) {
      const body = this.element.body as Phaser.Physics.Arcade.Body;
      body && body.setCircle(size);
    }
  }

  move(x: number, y: number) {
    if (this.element) {
      this.element.x += x;
      this.element.y += y;
    }
  }

  get position() {
    if (!this.element) return { x: 0, y: 0 };
    return { x: this.element.x, y: this.element.y };
  }

  get life() {
    return this.health;
  }
}
