import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-vertical-nav-button',
  imports: [],
  template: `
    <button
      type="button"
      [disabled]="disabled()"
      [attr.aria-label]="label()"
      [title]="label()"
      (click)="clicked.emit()">
      {{ icon() }}
    </button>
  `,
  styles: `
    button {
      width: 30px;
      height: 30px;
      border: 0;
      border-radius: 8px;
      color: #ffffff;
      background: #3b82f6;
      cursor: pointer;
      font-size: 12px;
      font-weight: 800;
      line-height: 1;
    }

    button:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalNavButton {
  readonly direction = input<'left' | 'right'>('right');
  readonly disabled = input(false);
  readonly label = input('Move');
  readonly clicked = output<void>();

  protected readonly icon = computed(() => (this.direction() === 'left' ? '\u25C0' : '\u25B6'));
}
