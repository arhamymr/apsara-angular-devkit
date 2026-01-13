import { Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section';
import { FeaturesSectionComponent } from './components/features-section';
import { CodeExampleSectionComponent } from './components/code-example-section';
import { CtaSectionComponent } from './components/cta-section';
import { ResourcesSectionComponent } from './components/resources-section';

@Component({
  selector: 'app-home',
  imports: [
    HeroSectionComponent,
    FeaturesSectionComponent,
    CodeExampleSectionComponent,
    CtaSectionComponent,
    ResourcesSectionComponent
  ],
  template: `
    <div class="landing-page">
      <app-hero-section />
      <app-features-section />
      <app-code-example-section />
      <app-cta-section />
      <app-resources-section />
    </div>
  `,
  styles: [`
    .landing-page {
      min-height: 100vh;
    }
  `]
})
export class HomeComponent {}
