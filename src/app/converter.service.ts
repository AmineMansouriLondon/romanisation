import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  roman: any = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  numerics: any = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };

  constructor() { }

  convertToNumber(rom) {
    let l = rom.length;
    let x = rom.charAt(l - 1);
    //start the number with the last letter in the roman numeral
    var num = this.numerics[x];
    //loop through the letters starting with second to last
    for (let i = l - 2; i >= 0; i--) {
      //our letter
      let r = rom.charAt(i);
      //letter on the right
      let c = rom.charAt(i + 1);
      //compare our numbers
      if (this.numerics[r] >= this.numerics[c]) {
        //if number on the right is larger/equal to we add
        num += this.numerics[r];
      } else {
        //REFERENCE: "The special case is where there is a character at left of current character 
        // whose value is less than the value corresponding to the current character. 
        // For e.g. X represents 10 but IX represents 9. 
        // In this case, we will subtract the value of the character in the left from the result." [redquark.org]
        //if number on the right smaller we subtract
        num -= this.numerics[r];
      }
    }
    return num
  }

  convertToRoman(num) {
    var str = '';
    for (let i of Object.keys(this.roman)) {
      //check if number equivalent to roman numeral at position i is smaller than our number
      var x = Math.floor(num / this.roman[i]);
      //deduct amount from out number which is calculated by multiplying the division result by the roman numeral
      num -= x * this.roman[i];
      //add the roman numeral to our string x amount of times
      str += i.repeat(x);
      //when our number is deducted down to 0 we return the result
      if (num === 0) {
        return str.toUpperCase();
      }
    }
  }
}
