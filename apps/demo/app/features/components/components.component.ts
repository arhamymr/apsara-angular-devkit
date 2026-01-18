import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent, TabsShowcaseComponent } from '@apsara/ui';
import { ButtonShowcaseComponent } from './button-showcase.component';
import { CardShowcaseComponent } from './card-showcase.component';
import { InputShowcaseComponent } from './input-showcase.component';

interface ComponentSection {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-components-showcase',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ButtonComponent,
    TabsShowcaseComponent,
    ButtonShowcaseComponent,
    CardShowcaseComponent,
    InputShowcaseComponent
  ],
  template: `
    <div class="flex min-h-[calc(100vh-64px)]">
      <aside class="w-[280px] bg-secondary border-r border-border flex flex-col sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
        <div class="p-6 border-b border-border">
          <h2 class="font-semibold text-foreground">Components</h2>
          <p class="text-xs text-dimmed mt-1">UI Library v1.0.0</p>
        </div>

        <nav class="flex-1 p-4 flex flex-col gap-1">
          @for (section of sections; track section.id) {
            <button
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg border-none bg-transparent cursor-pointer text-left transition-all duration-200 text-dimmed text-sm font-medium"
              [class.bg-primary]="activeSection() === section.id"
              [class.text-white]="activeSection() === section.id"
              [class.hover:bg-accent]="activeSection() !== section.id"
              (click)="setActiveSection(section.id)">
              <mat-icon class="w-6 text-center">{{ section.icon }}</mat-icon>
              <span>{{ section.title }}</span>
            </button>
          }
        </nav>
      </aside>

      <main class="flex-1 p-12 max-w-[900px]">
        @switch (activeSection()) {
          @case ('button') {
            <section class="mb-16 scroll-m-20">
              <h1 class="text-[32px] font-bold text-foreground mb-2 pb-4 border-b border-border">Button</h1>
              <p class="text-lg text-dimmed my-4 leading-relaxed">Interactive button component with multiple variants, sizes, and states.</p>

              <div class="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg my-6 text-primary">
                <strong>Import:</strong> <code class="bg-primary/20 px-2 py-0.5 rounded text-sm">import &#123; ButtonComponent &#125; from '@apsara/ui';</code>
              </div>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Examples</h2>
              <app-button-showcase />

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Variants</h2>
              <p class="text-dimmed my-4">Choose from different visual styles.</p>
              <div class="flex flex-wrap gap-3 my-4">
                <app-button variant="primary" label="Primary" />
                <app-button variant="secondary" label="Secondary" />
                <app-button variant="tertiary" label="Tertiary" />
                <app-button variant="danger" label="Danger" />
                <app-button variant="outline" label="Outline" />
                <app-button variant="plain" label="Plain" />
              </div>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Sizes</h2>
              <p class="text-dimmed my-4">Choose from different button sizes.</p>
              <div class="flex items-center gap-3 my-4 flex-wrap">
                <app-button size="xs" label="Extra Small" />
                <app-button size="sm" label="Small" />
                <app-button size="md" label="Medium" />
                <app-button size="lg" label="Large" />
              </div>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Rounded</h2>
              <p class="text-dimmed my-4">Control the border radius.</p>
              <div class="flex items-center gap-3 my-4 flex-wrap">
                <app-button rounded="none" label="None" />
                <app-button rounded="sm" label="Small" />
                <app-button rounded="md" label="Medium" />
                <app-button rounded="lg" label="Large" />
                <app-button rounded="full" label="Full" />
              </div>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">States</h2>
              <div class="flex items-center gap-3 my-4 flex-wrap">
                <app-button label="Default" />
                <app-button label="Loading" [loading]="true" />
                <app-button label="Disabled" [disabled]="true" />
                <app-button label="Block" [block]="true" class="w-full max-w-xs" />
              </div>
            </section>
          }

          @case ('card') {
            <section class="mb-16 scroll-m-20">
              <h1 class="text-[32px] font-bold text-foreground mb-2 pb-4 border-b border-border">Card</h1>
              <p class="text-lg text-dimmed my-4 leading-relaxed">Container component for grouping related content.</p>

              <div class="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg my-6 text-primary">
                <strong>Import:</strong> <code class="bg-primary/20 px-2 py-0.5 rounded text-sm">import &#123; CardComponent &#125; from '@apsara/ui';</code>
              </div>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Examples</h2>
              <app-card-showcase />
            </section>
          }

          @case ('input') {
            <section class="mb-16 scroll-m-20">
              <h1 class="text-[32px] font-bold text-foreground mb-2 pb-4 border-b border-border">Input</h1>
              <p class="text-lg text-dimmed my-4 leading-relaxed">Form input component with validation and styling.</p>

              <div class="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg my-6 text-primary">
                <strong>Import:</strong> <code class="bg-primary/20 px-2 py-0.5 rounded text-sm">import &#123; InputComponent, FieldComponent, FieldLabelComponent &#125; from '@apsara/ui';</code>
              </div>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Examples</h2>
              <app-input-showcase />
            </section>
          }

          @case ('tabs') {
            <section class="mb-16 scroll-m-20">
              <h1 class="text-[32px] font-bold text-foreground mb-2 pb-4 border-b border-border">Tabs</h1>
              <p class="text-lg text-dimmed my-4 leading-relaxed">Navigation tabs component for organizing content into sections.</p>

              <div class="bg-primary/10 border-l-4 border-primary p-5 rounded-r-lg my-6 text-primary">
                <strong>Import:</strong> <code class="bg-primary/20 px-2 py-0.5 rounded text-sm">import &#123; TabsComponent, TabsListComponent, TabsItemComponent, TabsPanelComponent &#125; from '@apsara/ui';</code>
              </div>

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Examples</h2>
              <app-tabs-showcase />

              <h2 class="text-2xl font-semibold text-foreground mt-10 mb-4">Usage</h2>
              <pre class="bg-tertiary text-foreground p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>&lt;app-tabs [defaultValue]="'tab1'"&gt;
  &lt;app-tabs-list&gt;
    &lt;app-tabs-item value="tab1"&gt;Tab 1&lt;/app-tabs-item&gt;
    &lt;app-tabs-item value="tab2"&gt;Tab 2&lt;/app-tabs-item&gt;
  &lt;/app-tabs-list&gt;

  &lt;app-tabs-panel value="tab1"&gt;
    Content for tab 1
  &lt;/app-tabs-panel&gt;

  &lt;app-tabs-panel value="tab2"&gt;
    Content for tab 2
  &lt;/app-tabs-panel&gt;
&lt;/app-tabs&gt;</code></pre>
            </section>
          }
        }
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ComponentsShowcaseComponent {
  activeSection = signal<string>('button');

  sections: ComponentSection[] = [
    { id: 'button', title: 'Button', icon: 'smart_button' },
    { id: 'card', title: 'Card', icon: 'crop_square' },
    { id: 'input', title: 'Input', icon: 'text_fields' },
    { id: 'tabs', title: 'Tabs', icon: 'tab' }
  ];

  setActiveSection(sectionId: string) {
    this.activeSection.set(sectionId);
  }
}
