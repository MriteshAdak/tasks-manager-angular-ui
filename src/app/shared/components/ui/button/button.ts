import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

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
    </button>
  `,
  styles: `
    button {
      height: 46px;
      border: 0;
      border-radius: 12px;
      padding: 0 20px;
      font-weight: 700;
      color: #fff;
      background: #3b82f6;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly disabled = input(false);
  readonly className = input('');
  readonly clicked = output<void>();
}
