import { Scene } from 'phaser';

export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        this.add.image(240, 160, 'black');

        // this.add.image(240, 120, 'logo_dc');
        this.add.image(240, 160, 'logo_act_blizz');

        // this.add.text(240, 200, 'Main Menu', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(0.5);

        const scoreText = this.add.text(140, 120, "Hello", {
            fontFamily: "PressStart2P",
            fontSize: "8px",
            color: "#d9d9d9",
            align: 'center'
        }).setFixedSize(100, 0).setScale(2);

        const button = this.add.text(210, 200, "START", {
            fontFamily: "PressStart2P",
            fontSize: "8px",
            color: "#d9d9d9",
            align: 'center',
            backgroundColor: "#114800"
        }).setFixedSize(60, 0).setPadding(8, 4).setScale(1);

        this.input.once('pointerdown', () => {
            this.scene.start('Scene1');
        });
    }
}
