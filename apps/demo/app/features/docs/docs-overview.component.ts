import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Rocket, Palette, Terminal, Book, ExternalLink, ArrowRight, Menu } from 'lucide-angular';
import { CardComponent } from '@apsara/ui';

interface DocSection {
  id: string;
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-docs-overview',
  standalone: true,
  imports: [RouterLink, LucideAngularModule, CardComponent],
  template: `
    <div class="min-h-screen bg-background text-foreground">
      <app-card padding="large" align="center" class="w-full mx-auto px-6 mb-16">
        <h1 class="text-[2.5rem] mb-4 text-foreground">Documentation</h1>
        <p class="text-[1.125rem] text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
          Everything you need to know to get started and make the most of Apsara Angular DevKit
        </p>
      </app-card>

      <main class="max-w-[1400px] mx-auto px-6">
        <section class="mb-14">
          <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            @for (section of sections; track section.id) {
              <a
                [routerLink]="'/docs/' + section.id"
                class="group flex items-start gap-4 p-5 bg-card border border-border rounded-xl no-underline text-inherit transition-all duration-200 hover:border-primary hover:shadow-lg hover:-translate-y-0.5">
                <div class="flex items-center justify-center size-12 bg-accent rounded-xl flex-shrink-0">
                  <lucide-angular [img]="getIcon(section.icon)" class="text-primary" />
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-base font-medium mb-0.5 text-foreground">{{ section.title }}</h3>
                  <p class="text-sm text-muted-foreground leading-relaxed m-0">{{ section.description }}</p>
                </div>
                <lucide-angular [img]="ArrowRight" class="text-muted-foreground text-xs self-center opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </a>
            }
          </div>
        </section>
      </main>
    </div>
  `
})
export class DocsOverviewComponent {
  Rocket = Rocket;
  Palette = Palette;
  Terminal = Terminal;
  Book = Book;
  ExternalLink = ExternalLink;
  ArrowRight = ArrowRight;
  Menu = Menu;
  sections: DocSection[] = [
    { id: 'getting-started', title: 'Getting Started', icon: 'rocket', description: 'Installation and quick setup guide' },
    { id: 'theming', title: 'Theming', icon: 'palette', description: 'Customize colors and appearance' },
    { id: 'cli', title: 'CLI Commands', icon: 'terminal', description: 'Available commands and usage' },
    { id: 'guides', title: 'Guides', icon: 'book', description: 'Step-by-step tutorials' },
    { id: 'resources', title: 'Resources', icon: 'externalLink', description: 'Links and learning materials' },
    { id: 'icons', title: 'Icons', icon: 'menu', description: 'Icon library and usage guide' }
  ];

  getIcon(name: string) {
    const iconMap: Record<string, any> = {
      'rocket': Rocket,
      'palette': Palette,
      'terminal': Terminal,
      'book': Book,
      'externalLink': ExternalLink,
      'menu': Menu,
    };
    return iconMap[name] || Rocket;
  }
}
