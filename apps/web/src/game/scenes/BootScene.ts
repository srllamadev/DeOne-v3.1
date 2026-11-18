import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    const { width, height } = this.scale;
    const bar = this.add.graphics();
    const progress = this.add.graphics();

    this.load.on("progress", (value: number) => {
      progress.clear();
      progress.fillStyle(0xe94560, 1);
      progress.fillRect(width / 2 - 100, height / 2, 200 * value, 20);
    });

    this.load.on("complete", () => {
      bar.destroy();
      progress.destroy();
    });
  }

  create() {
    this.scene.start("MainMenuScene");
  }
}
