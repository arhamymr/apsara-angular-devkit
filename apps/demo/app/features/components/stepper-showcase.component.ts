import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface StepperProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-stepper-showcase',
  standalone: true,
  imports: [CommonModule, StepperComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="stepper" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Stepper</h2>
        <p class="text-dimmed">A stepper component for multi-step workflows</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <app-stepper
                [steps]="['Account', 'Profile', 'Review']"
                [currentStep]="currentStep()"
                (stepChange)="onStepChange($event)" />
              <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-600">
                  <strong>Current Step:</strong> <strong>Step {{ currentStep() + 1 }} - {{ getStepContent() }}</strong>
                </p>
              </div>
            </div>
          } @else {
            <app-code-snippet [code]="basicCode" language="html" />
          }
        </app-tabs>
      </app-card>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Installation</h3>
        <app-code-snippet [code]="installCode" language="bash" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Usage</h3>
        <app-code-snippet [code]="importCode" language="typescript" />
        <app-code-snippet [code]="usageCode" language="html" />
      </div>

      <div class="mt-8">
        <h3 class="text-lg font-semibold text-foreground mb-4">Props</h3>
        <ng-template #tableHeader>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 text-foreground">{{ prop.type }}</td>
          <td class="p-3 text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class StepperShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');
  currentStep = signal(0);

  installCode = `npm install @apsara/ui/stepper`;

  importCode = `import { StepperComponent } from '@apsara/ui/stepper';`;

  usageCode = `<app-stepper
  [steps]="['Account', 'Profile', 'Review']"
  [currentStep]="currentStep()"
  (stepChange)="onStepChange($event)" />`;

  basicCode = `<app-stepper
  [steps]="['Account', 'Profile', 'Review']"
  [currentStep]="currentStep()"
  (stepChange)="onStepChange($event)" />`;

  propsData = () => [
    { name: 'steps', type: 'string[]', description: 'Array of step labels' },
    { name: 'currentStep', type: 'number', description: 'Current active step index' },
    { name: 'stepChange', type: 'EventEmitter<number>', description: 'Emitted when step changes' }
  ];

  onStepChange(step: number): void {
    this.currentStep.set(step);
  }

  getStepContent(): string {
    const contents = [
      'Enter your account details',
      'Fill in your profile information',
      'Review before submitting'
    ];
    return contents[this.currentStep()];
  }
}
