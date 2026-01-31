import { Component, input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
  selector: 'app-sonner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxSonnerToaster],
  template: `
    <ngx-sonner-toaster
      [position]="position()"
      [expand]="expand()"
      [richColors]="richColors()"
      [closeButton]="closeButton()"
      [theme]="theme()"
      [offset]="offset()"
      [dir]="dir()"
      [visibleToasts]="visibleToasts()"
      [duration]="duration()"
    />
  `,
  encapsulation: ViewEncapsulation.None,
})
export class SonnerComponent {
  position = input<any>('bottom-right');
  expand = input<boolean>(false);
  richColors = input<boolean>(false);
  closeButton = input<boolean>(false);
  theme = input<'light' | 'dark' | 'system'>('system');
  offset = input<string | number | null>(null);
  dir = input<'ltr' | 'rtl' | 'auto'>('auto');
  visibleToasts = input<number>(3);
  duration = input<number>(4000);
}
