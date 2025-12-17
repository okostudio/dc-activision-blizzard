import { Scene } from 'phaser';

import logo_dc from "../assets/logo-dc.png";
import croc_bg from "../assets/croc-bg.png";
import croc_overlay from "../assets/croc-overlay.png";
import platform from "../assets/platform.png";
import tv_lines from "../assets/tv-lines.png";
import text_2 from "../assets/text/scene_text2.png";


export class Scene2 extends Scene {

    constructor() {
        super('Scene2');
    }

    init(data) {
        this.initialPlayerX = data.newPlayerX;
        this.initialPlayerY = data.newPlayerY;
        this.nextSceneKey = 'Scene3';
        this.prevSceneKey = 'Scene1';
        this.mainTextContent = "And just like Pitfall Harry, \nthe explorer character in this game, \nwe are on the hunt for GOLD"
        this.mainTextContent = ""
        this.newPlayerVelocity = data.newPlayerVelovity ? data.newPlayerVelovity : 0;
    }

    preload() {
        this.load.image("logo_dc", logo_dc);
        this.load.image("croc_bg", croc_bg);
        this.load.image("tv_lines", tv_lines);
        this.load.image("croc_overlay", croc_overlay);
        this.load.image("platform", platform);
        this.load.image("text_2", text_2);
    }

    create() {

        this.input.once('pointerdown', () => {
            this.scene.start(this.nextSceneKey);
        });

        const gameWidth = this.game.config.width
        const gameHeight = this.game.config.height

        this.add.image(gameWidth * 0.5, 160, "croc_bg");
        this.add.image(gameWidth * 0.5, 298, "logo_dc");
        this.add.image(gameWidth * 0.5, 160, "text_2");

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

        this.crocs = [
            this.add.sprite(170, 182, 'croc'),
            this.add.sprite(225, 182, 'croc'),
            this.add.sprite(280, 182, 'croc')
        ]

        this.treasure = [
            this.add.sprite(385, 268, 'gold'),
        ]

        // OVERLAY LAYERS
        this.add.image(gameWidth * 0.5, gameHeight * 0.5, "croc_overlay");
        this.add.image(gameWidth * 0.5, gameHeight * 0.5, "tv_lines");

        //gold
        // const stars = this.physics.add.group({
        //     key: "gold",
        //     repeat: 11,
        //     setXY: { x: 12, y: 0, stepX: 70 },
        // });
        // stars.children.iterate(function (child) {
        //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        // });
        // this.physics.add.collider(stars, platforms);
        // this.physics.add.overlap(this.player, stars, collect, null, this);

    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();

        this.crocs.map(croc => {
            croc.anims.play("crocSnap", true);
        })
        this.treasure.map(gold => {
            gold.anims.play("goldShine", true);
        })


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
            if (this.nextSceneKey) {
                this.changeToNextScene(this.nextSceneKey, { newPlayerX: 20, newPlayerY: this.player.y, newPlayerVelovity: this.player.body.velocity.x });
            } else if (cursors.right.isDown) {
                this.player.setVelocityX(0);
            }
        }
        if (this.player.x <= 15) {
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


