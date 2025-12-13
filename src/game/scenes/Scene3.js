import { Scene } from 'phaser';

import logo_dc from "../assets/logo-dc.png";
import forest_3 from "../assets/forest_3.png";
import overlay_3 from "../assets/forest_3-overlay.png";
import platform from "../assets/platform.png";
import tv_lines from "../assets/tv-lines.png";
import text_3 from "../assets/text/scene_text3.png";
import man from "../assets/man.png";

export class Scene3 extends Scene {

    constructor() {
        super('Scene3');
    }

    init(data) {
        this.initialPlayerX = data.newPlayerX;
        this.initialPlayerY = data.newPlayerY;
        this.nextSceneKey = 'Scene4';
        this.prevSceneKey = 'Scene2';
        this.mainTextContent = "For us at DC, \nGold comes from great ideas."
        this.mainTextContent = ""
        this.newPlayerVelocity = data.newPlayerVelovity ? data.newPlayerVelovity : 0;
    }

    preload() {
        this.load.image("tv_lines", tv_lines);
        this.load.image("logo_dc", logo_dc);
        this.load.image("forest_3", forest_3);
        this.load.image("overlay_3", overlay_3);
        this.load.image("platform", platform);
        this.load.image("text_3", text_3);
    }

    create() {

        this.input.once('pointerdown', () => {
            this.scene.start(this.nextSceneKey);
        });

        const gameWidth = this.game.config.width
        const gameHeight = this.game.config.height

        this.add.image(gameWidth * 0.5, 160, "forest_3");
        this.add.image(gameWidth * 0.5, 298, "logo_dc");
        this.add.image(gameWidth * 0.5, 160, "text_3");

        this.add.text(0, 25, this.mainTextContent, {
            fontFamily: "PressStart2P",
            fontSize: "12px",
            lineSpacing: 1,
            color: "#d9d9d9",
            align: 'center'
        }).setFixedSize(480, 0).setScale(1);

        const platforms = this.physics.add.staticGroup();
        platforms.create(90, 193, "platform").setVisible(false).setScale(0.5).refreshBody();
        platforms.create(240, 193, "platform").setVisible(false).setScale(0.5).refreshBody();
        platforms.create(390, 193, "platform").setVisible(false).setScale(0.5).refreshBody();
        platforms.create(gameWidth * 0.5, 286, "platform").setVisible(false).setScale(1.6).refreshBody();

        //platforms
        this.player = this.physics.add.sprite(this.initialPlayerX ? this.initialPlayerX : 60, this.initialPlayerY ? this.initialPlayerY : 90, "man"); this.player.setBounce(0.1);
        this.player.setVelocityX(this.newPlayerVelocity)

        this.player.setCollideWorldBounds(false);
        this.physics.add.collider(this.player, platforms);

        // OVERLAY LAYERS
        this.add.image(gameWidth * 0.5, gameHeight * 0.5, "overlay_3");
        this.add.image(gameWidth * 0.5, gameHeight * 0.5, "tv_lines");


    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown && !cursors.up.isDown) {
            // RUN LEFT
            this.player.setVelocityX(-180);
            this.player.anims.play("runLeft", true);
        } else if (cursors.right.isDown && !cursors.up.isDown) {
            // RUN RIGHT
            this.player.setVelocityX(180);
            this.player.anims.play("runRight", true);
        } else if (cursors.up.isDown) {
            // JUMP
            if (cursors.left.isDown) {
                this.player.anims.play("jumpLeft", true);
            } else {
                this.player.anims.play("jumpRight", true);
            }
        } else {
            // STAND STILL
            if (this.player.FACING_LEFT) {
                this.player.anims.play("lookLeft");
            } else {
                this.player.anims.play("lookRight");
            }
            this.player.setVelocityX(0);
        }

        // Check if player reaches the  edge of the screen
        const gameWidth = this.game.config.width
        if (this.player.x >= gameWidth - 15) {
            console.log("new scene right")
            if (this.nextSceneKey) {
                this.changeToNextScene(this.nextSceneKey, { newPlayerX: 20, newPlayerY: this.player.y, newPlayerVelovity: this.player.body.velocity.x });
            } else if (cursors.right.isDown) {
                this.player.setVelocityX(0);
            }
        }
        if (this.player.x <= 15) {
            console.log("new scene left")
            if (this.prevSceneKey) {
                this.changeToNextScene(this.prevSceneKey, { newPlayerX: gameWidth - 20, newPlayerY: this.player.y, newPlayerVelovity: this.player.body.velocity.x });
            } else if (cursors.left.isDown) {
                this.player.setVelocityX(0);
            }
        }

        // JUMP
        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-480);
        }
    }

    changeToNextScene(sceneKey, playerData) {
        this.scene.stop(this.scene.key); // Stop the current scene
        this.scene.start(sceneKey, playerData); // Start the new scene and pass data
    }
}


