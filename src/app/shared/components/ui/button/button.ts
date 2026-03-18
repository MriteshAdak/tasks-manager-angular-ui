import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: ` 
  <button 
    [type]="type()"
    [disabled]="disabled()"
    [class]="className()"
    (click)="clicked.emit()">
    <ng-content></ng-content>
  </button> `,
  styles: ``,
})
export class Button {
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly className = input('');
  readonly clicked = output<void>();
}
