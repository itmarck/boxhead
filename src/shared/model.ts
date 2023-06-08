import {
  LayersModel,
  Tensor,
  loadLayersModel,
  tensor2d,
} from "@tensorflow/tfjs";

const ACTIONS = [
  "attack",
  "dodge",
  "go_back",
  "go_forward",
  "call_for_backup",
] as const;

const THRESHOLD = 0.35;

export type Action = (typeof ACTIONS)[number];

export interface ModelInput {
  life: number;
  friendsClose: boolean;
  inDanger: boolean;
  distance: "together" | "close" | "middle" | "far";
  playerLife: "dead" | "critic" | "low" | "middle" | "full";
}

export class Model {
  constructor(private instance: LayersModel) {}

  predict({
    life = 0,
    friendsClose = false,
    inDanger = false,
    distance = "far",
    playerLife = "full",
  }: ModelInput): Action[] {
    const tensor = tensor2d([
      [
        Number(life),
        friendsClose ? 1 : 0,
        inDanger ? 1 : 0,
        ...[
          distance === "close" ? 1 : 0,
          distance === "far" ? 1 : 0,
          distance === "middle" ? 1 : 0,
          distance === "together" ? 1 : 0,
        ],
        ...[
          playerLife === "critic" ? 1 : 0,
          playerLife === "dead" ? 1 : 0,
          playerLife === "full" ? 1 : 0,
          playerLife === "low" ? 1 : 0,
          playerLife === "middle" ? 1 : 0,
        ],
      ],
    ]);

    const prediction = this.instance.predict(tensor) as Tensor;
    const values = prediction.dataSync();

    const actions: Action[] = [];

    for (let index = 0; index < values.length; index++) {
      if (values[index] > THRESHOLD) {
        actions.push(ACTIONS[index]);
      }
    }

    return actions;
  }
}

export async function loadModel(): Promise<LayersModel> {
  return await loadLayersModel("/model/model.json");
}
