import { Component } from '@angular/core';
import { ConverterService } from '../converter.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  letters: any[] = ["I", "V", "X", "L", "C", "D", "M"];
  convert_dir: any = 'rom-num';
  animate: any;
  roman: any;
  number: any;
  intro: any;
  click: any;

  constructor(
    private converter: ConverterService,
    private alert: AlertController
  ) {
    this.click = new Audio();
    this.click.src = "assets/audio/click.mp3";
    this.click.load();
  }

  ionViewDidEnter() {
    this.playIntro();
  }

  changeRoman($event) {
    this.convert_dir = "rom-num";
    this.roman = $event;
  }

  changeNumber($event) {
    this.convert_dir = "num-rom";
    this.number = $event;
  }

  checker() {
    if (this.convert_dir == 'rom-num') {
      const pattern = /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/
      if (pattern.test(this.roman) == false) {
        this.presentAlert('Your Roman Numeral is not valid!');
      } else {
        this.convert();
      }
    } else {
      if (this.number > 3000) {
        this.presentAlert('You cannot convert numbers over 3000!')
      } else if (isNaN(this.number)) {
        this.presentAlert('You can only use numbers here!');
      } else {
        this.convert();
      }
    }
  }

  convert() {
    this.click.play();
    if (this.convert_dir == 'rom-num') {
      this.number = this.converter.convertToNumber(this.roman.toUpperCase());
      this.animate = 'num';
      setTimeout(() => {
        this.animate = null;
      }, 1500);
    } else {
      this.roman = this.converter.convertToRoman(this.number);
      this.animate = 'rom';
      setTimeout(() => {
        this.animate = null;
      }, 1500);
    }
  }

  playIntro() {
    this.intro = new Audio();
    this.intro.src = "assets/audio/intro.mp3";
    this.intro.load();
    this.intro.play();
  }

  async presentAlert(message) {
    const alert = await this.alert.create({
      header: 'Oops!',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
