import { Scene } from 'phaser';

import forest from "../assets/forest-2.png";
import pitTop from "../assets/forest-2-overlay.png";
import ground from "../assets/platform.png";
import star from "../assets/star.png";
import bomb from "../assets/bomb.png";
import monkey from "../assets/dude.png";
import man from "../assets/man.png";



export class Game extends Scene {
    constructor() {
        super('Game');
    }

    preload() {
        this.load.image("forest", forest);
        this.load.image("pitTop", pitTop);
        this.load.image("ground", ground);
        this.load.image("star", star);
        this.load.image("bomb", bomb);

        this.load.spritesheet("dude", monkey, {
            frameWidth: 32,
            frameHeight: 48,
        });
        this.load.spritesheet("man", man, {
            frameWidth: 40,
            frameHeight: 50,
        });
    }

    create() {
        this.add.image(240, 160, "forest");

        const platforms = this.physics.add.staticGroup();
        platforms.create(45, 198, "ground").setVisible(false).setScale(0.5).refreshBody();
        platforms.create(420, 198, "ground").setVisible(false).setScale(0.5).refreshBody();
        platforms.create(240, 296, "ground").setVisible(false).setScale(1.6).refreshBody();

        //platforms
        this.player = this.physics.add.sprite(60, 90, "man");
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platforms);
        //animation
        this.anims.create({
            key: "lookLeft",
            frames: [{ key: "man", frame: 6 }],
            frameRate: 10,
        });
        this.anims.create({
            key: "lookRight",
            frames: [{ key: "man", frame: 7 }],
            frameRate: 10,
        });
        this.anims.create({
            key: "jumpRight",
            frames: [{ key: "man", frame: 8 }],
            frameRate: 10,
        });
        this.anims.create({
            key: "jumpLeft",
            frames: [{ key: "man", frame: 5 }],
            frameRate: 10,
        });
        this.anims.create({
            key: "runRight",
            frames: this.anims.generateFrameNumbers("man", { start: 8, end: 12 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "runLeft",
            frames: this.anims.generateFrameNumbers("man", { start: 5, end: 1 }),
            frameRate: 10,
            repeat: -1,
        });


        // //stars
        // const stars = this.physics.add.group({
        //     key: "star",
        //     repeat: 11,
        //     setXY: { x: 12, y: 0, stepX: 70 },
        // });
        // stars.children.iterate(function (child) {
        //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        // });
        // this.physics.add.collider(stars, platforms);
        // this.physics.add.overlap(this.player, stars, collect, null, this);
        // //bombs

        // const bombs = this.physics.add.group();
        // this.physics.add.collider(bombs, platforms);

        // this.physics.add.collider(this.player, bombs, bombTouched, null, this);

        // function bombTouched(player, bomb) {
        //     this.physics.pause();
        //     this.player.setTint(0xff000);
        //     this.player.anims.play("turn");
        // }

        //score text

        // const scoreText = this.add.text(140, 120, "Hello", {
        //     fontFamily: "PressStart2P",
        //     fontSize: "8px",
        //     color: "#d9d9d9",
        //     align: 'center'
        // }).setFixedSize(100, 0).setScale(2);

        const frame1 = this.add.text(0, 15, "We are \nDentsu Creative \nand we are excited \nto be here.", {
            fontFamily: "PressStart2P",
            fontSize: "8px",
            color: "#d9d9d9",
            align: 'center'
        }).setFixedSize(240, 0).setScale(2);


        //stars collision
        // function collect(player, star) {
        //     star.disableBody(true, true);
        //     score += 1;
        //     // scoreText.setText("Score: " + score);

        //     if (stars.countActive(true) === 0) {
        //         stars.children.iterate(function (child) {
        //             child.enableBody(true, child.x, 0, true, true);
        //         });

        //         var x =
        //             player.x < 400
        //                 ? Phaser.Math.Between(400, 800)
        //                 : Phaser.Math.Between(0, 400);

        //         const bomb = bombs.create(x, 16, "bomb");
        //         bomb.setBounce(1);
        //         bomb.setCollideWorldBounds(true);
        //         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        //     }
        // }

        console.log("player", this.player)

        this.add.image(240, 160, "pitTop");
    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();
        if (cursors.left.isDown && !cursors.up.isDown) {
            this.player.setVelocityX(-180);
            // this.player.facingLeft = true;
            this.player.anims.play("runLeft", true);
        } else if (cursors.right.isDown && !cursors.up.isDown) {
            this.player.setVelocityX(180);
            // this.player.facingLeft = false;
            this.player.anims.play("runRight", true);
        } else if (cursors.up.isDown) {
            if (cursors.left.isDown) {
                this.player.anims.play("jumpLeft", true);
            } else {
                this.player.anims.play("jumpRight", true);
            }

        } else {
            if (this.player.FACING_LEFT) {
                this.player.anims.play("lookLeft");
            } else {
                this.player.anims.play("lookRight");
            }
            this.player.setVelocityX(0);


        }

        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-480);
        }
    }
}


