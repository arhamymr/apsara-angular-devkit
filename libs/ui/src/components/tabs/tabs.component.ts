import { Component, input, output, signal, ViewChild, ContentChildren, QueryList, AfterContentInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsItemComponent } from './tabs-item.component';
import { TabsPanelComponent } from './tabs-panel.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="className()">
      <ng-content select="app-tabs-list"></ng-content>
      <ng-content select="app-tabs-panel"></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class TabsComponent implements AfterContentInit {
  readonly className = input<string>('');
  readonly defaultValue = input.required<string>();
  readonly valueChange = output<string>();

  @ContentChildren(TabsItemComponent) items!: QueryList<TabsItemComponent>;
  @ContentChildren(TabsPanelComponent) panels!: QueryList<TabsPanelComponent>;

  private _value = signal<string>('');

  ngAfterContentInit(): void {
    this._value.set(this.defaultValue());
  }

  get value(): string {
    return this._value();
  }

  setValue(value: string): void {
    this._value.set(value);
    this.valueChange.emit(value);
  }
}
