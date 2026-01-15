import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SidebarItem {
  label: string;
  route: string;
}

interface SidebarCategory {
  name: string;
  items: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="h-full lg:pr-8 pb-10 max-lg:pb-20 outline-none base-ui-disable-scrollbar overflow-y-auto"
           style="overflow: auto; --scroll-area-overflow-x-start: 0px; --scroll-area-overflow-x-end: 0px; --scroll-area-overflow-y-start: 0px; --scroll-area-overflow-y-end: 0px;">
      <div class="pl-1" style="min-width: fit-content;">
        <nav class="flex flex-col gap-4.5 py-9">
          @for (category of categories(); track category.name) {
            <section class="flex flex-wrap gap-0.5 *:data-[slot=sidebar-list]:p-0">
              <span class="inline-flex items-center text-sm font-medium text-dimmed **:[svg]:size-3.5">
                {{ category.name }}
              </span>
              <ul class="flex flex-col gap-0.5 w-full" data-slot="sidebar-list">
                @for (item of category.items; track item.route) {
                  <li class="group/sidebar-item **:data-[slot=sidebar-submenu]:w-auto relative flex">
                    <a [routerLink]="item.route"
                       routerLinkActive="active bg-accent"
                       [routerLinkActiveOptions]="{ exact: item.route === '/' }"
                       class="flex items-center gap-2.5 w-full relative z-10 text-foreground cursor-pointer text-left transition-colors duration-75 hover:bg-accent **:[svg]:size-4 **:[svg]:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 outline-primary data-popup-open:bg-accent">
                      {{ item.label }}
                    </a>
                  </li>
                }
              </ul>
            </section>
          }
        </nav>
      </div>
    </aside>
  `,
  styles: [`
    :host {
      display: block;
    }

    aside {
      position: sticky;
      top: 64px;
      height: calc(100vh - 64px);
    }

    nav {
      min-width: fit-content;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      margin: 0;
    }

    a {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      text-decoration: none;
      font-size: 14px;
      color: var(--color-text-primary);
      border-radius: 6px;
      transition: background-color 0.15s ease;
    }

    a:hover {
      background: var(--color-bg-hover);
    }

    a.active,
    a.bg-accent {
      background: var(--color-bg-hover);
    }

    a:focus-visible {
      outline: 2px solid var(--color-primary);
      outline-offset: 2px;
    }

    @media (max-width: 1024px) {
      aside {
        padding-bottom: 80px;
      }
    }

    @media (max-width: 768px) {
      aside {
        display: none;
      }
    }
  `]
})
export class SidebarComponent {
  categories = input.required<SidebarCategory[]>();
}
