import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  template: ` 
  <input 
  [value]="value()" 
  [placeholder]="placeholder()" 
  [disabled]="disabled()" 
  (keydown.enter)="enterPressed.emit((
    $any($event.target).value ?? ''
    ).toString())" /> 
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Input {
  readonly value = input<string>("");
  readonly placeholder = input<string>("");
  readonly disabled = input<boolean>(false);
  // readonly changed = output<string>();
  readonly enterPressed = output<string>();
}
