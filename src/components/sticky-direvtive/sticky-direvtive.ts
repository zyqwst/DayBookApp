import { Directive } from '@angular/core';


@Directive({
  selector: '[sticky-direvtive]' // Attribute selector
})
export class StickyDirevtive {

  constructor() {
    console.log('Hello StickyDirevtive Directive');
  }

}
