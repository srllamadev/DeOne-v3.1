import Phaser from "phaser";
import { GAME_CONFIG } from "@stellar-game/game-config";

export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainMenuScene" });
  }

  create() {
    const { width, height } = this.scale;

    this.cameras.main.setBackgroundColor("#1a1a2e");

    const title = this.add.text(width / 2, height / 3, GAME_CONFIG.APP_TITLE, {
      fontSize: "48px",
      color: "#f5a623",
      fontFamily: "system-ui, sans-serif",
      fontStyle: "bold",
    });
    title.setOrigin(0.5);

    const subtitle = this.add.text(width / 2, height / 3 + 60, "Billetera Stellar Gamificada", {
      fontSize: "20px",
      color: "#c0c0c0",
      fontFamily: "system-ui, sans-serif",
    });
    subtitle.setOrigin(0.5);

    const playButton = this.add.text(width / 2, height / 2 + 40, "[ ENTRAR ]", {
      fontSize: "28px",
      color: "#0f3460",
      backgroundColor: "#e94560",
      padding: { x: 20, y: 10 },
      fontFamily: "system-ui, sans-serif",
      fontStyle: "bold",
    });
    playButton.setOrigin(0.5);
    playButton.setInteractive({ useHandCursor: true });

    playButton.on("pointerover", () => {
      playButton.setStyle({ color: "#ffffff" });
    });

    playButton.on("pointerout", () => {
      playButton.setStyle({ color: "#0f3460" });
    });

    playButton.on("pointerdown", () => {
      this.cameras.main.fadeOut(500, 0, 0, 0);
    });

    const version = this.add.text(width / 2, height - 30, `v${GAME_CONFIG.VERSION}`, {
      fontSize: "14px",
      color: "#666666",
      fontFamily: "system-ui, sans-serif",
    });
    version.setOrigin(0.5);

    this.tweens.add({
      targets: title,
      scaleX: 1.05,
      scaleY: 1.05,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut",
    });
  }
}
