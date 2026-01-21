import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '@apsara/ui';
import {
  FormShowcaseComponent,
  BadgesShowcaseComponent,
  InputGroupShowcaseComponent,
  ButtonsShowcaseComponent,
  SwitchesShowcaseComponent,
  SliderShowcaseComponent,
  RadioShowcaseComponent,
  CheckboxShowcaseComponent,
  EmptyShowcaseComponent,
  TabsShowcaseComponent,
  DialogShowcaseComponent,
  MenuShowcaseComponent
} from './showcase-cards';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-components-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    FormShowcaseComponent,
    BadgesShowcaseComponent,
    InputGroupShowcaseComponent,
    ButtonsShowcaseComponent,
    SwitchesShowcaseComponent,
    SliderShowcaseComponent,
    RadioShowcaseComponent,
    CheckboxShowcaseComponent,
    EmptyShowcaseComponent,
    TabsShowcaseComponent,
    DialogShowcaseComponent,
    MenuShowcaseComponent
  ],
  template: `
    <section class="py-20 px-6 max-w-[1400] mx-auto">
      <div class="text-center mb-12">
        <div class="mb-4">
          <span class="inline-flex items-center px-3.5 py-1.5 bg-accent text-accent-foreground text-xs font-medium rounded-full">
            Components
          </span>
        </div>
        <h2 class="text-4xl text-foreground mb-4 tracking-tight">Beautiful, accessible components</h2>
        <p class="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Copy and paste components into your apps. Accessible, customizable, and open source.
        </p>
      </div>

      <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        @for (item of showcaseItems(); track item.id) {
          <div class="break-inside-avoid flex flex-col">
            @switch (item.id) {
              @case ('form') {
                <app-form-showcase />
              }
              @case ('badges') {
                <app-badges-showcase />
              }
              @case ('input-group') {
                <app-input-group-showcase />
              }
              @case ('buttons') {
                <app-buttons-showcase />
              }
              @case ('switches') {
                <app-switches-showcase />
              }
              @case ('slider') {
                <app-slider-showcase />
              }
              @case ('radio') {
                <app-radio-showcase />
              }
              @case ('checkbox') {
                <app-checkbox-showcase />
              }
              @case ('empty') {
                <app-empty-showcase />
              }
              @case ('tabs') {
                <app-tabs-showcase />
              }
              @case ('dialog') {
                <app-dialog-showcase />
              }
              @case ('menu') {
                <app-menu-showcase />
              }
            }
          </div>
        }
      </div>

      <div class="flex justify-center mt-12">
        <app-button
          variant="outline"
          (clicked)="navigateTo('/components')">
          Browse Components
      </app-button>
      </div>
    </section>
  `
})
export class ComponentsShowcaseComponent {
  private readonly router = inject(Router);

  showcaseItems = signal<ShowcaseItem[]>([
    { id: 'form', title: 'Form', description: 'Complete form example', category: 'Forms', },
    { id: 'badges', title: 'Badges', description: 'Status indicators', category: 'Data Display' },
    { id: 'input-group', title: 'Input Group', description: 'Input with addons', category: 'Forms' },
    { id: 'buttons', title: 'Buttons', description: 'Multiple variants', category: 'Actions' },
    { id: 'switches', title: 'Switches', description: 'Toggle settings', category: 'Forms' },
    { id: 'slider', title: 'Slider', description: 'Range selection', category: 'Forms' },
    { id: 'radio', title: 'Radio Group', description: 'Single selection', category: 'Forms' },
    { id: 'checkbox', title: 'Checkbox Cards', description: 'Selectable cards', category: 'Forms' },
    { id: 'empty', title: 'Empty States', description: 'Placeholder states', category: 'Feedback' },
    { id: 'tabs', title: 'Tabs', description: 'Tab navigation', category: 'Navigation' },
    { id: 'dialog', title: 'Dialog', description: 'Modal dialogs', category: 'Overlay' },
    { id: 'menu', title: 'Dropdown Menu', description: 'Context menus', category: 'Navigation' }
  ]);

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
