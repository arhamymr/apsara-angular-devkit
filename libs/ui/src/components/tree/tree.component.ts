import { Component, input, output, signal, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../lib/cn';

export interface TreeNode<T = unknown> {
  name: string;
  icon?: string;
  children?: TreeNode<T>[];
  expanded?: boolean;
  selected?: boolean;
  data?: T;
}

@Component({
  selector: 'app-tree',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div class="py-2">
      @for (node of nodes(); track node.name) {
        <div class="select-none">
          <div
            class="flex items-center gap-2 px-2 py-1 rounded cursor-pointer
                   hover:bg-gray-100"
            [class.bg-blue-50]="node.selected"
            (click)="onNodeClick(node)"
            (keydown)="onKeydown($event, node)">
            @if (node.children && node.children.length > 0) {
              <button
                class="p-0.5 rounded hover:bg-gray-200"
                (click)="onToggle(node, $event)">
                <i
                  class="material-icons text-sm transition-transform"
                  [class.rotate-90]="node.expanded">
                  chevron_right
                </i>
              </button>
            } @else {
              <span class="w-6"></span>
            }
            @if (node.icon) {
              <i class="material-icons text-sm text-gray-400">{{ node.icon }}</i>
            }
            <span class="text-sm text-gray-900">{{ node.name }}</span>
          </div>
          @if (node.expanded && node.children) {
            <div class="ml-4 border-l border-gray-200 pl-2">
              @for (child of node.children; track child.name) {
                <ng-container *ngTemplateOutlet="nodeTemplate; context: { $implicit: child }" />
              }
            </div>
          }
        </div>
      }
    </div>
    <ng-template #nodeTemplate let-child>
      <div class="select-none">
        <div
          class="flex items-center gap-2 px-2 py-1 rounded cursor-pointer
                 hover:bg-gray-100"
          [class.bg-blue-50]="child.selected"
          (click)="onNodeClick(child)"
          (keydown)="onKeydown($event, child)">
          @if (child.children && child.children.length > 0) {
            <button
              class="p-0.5 rounded hover:bg-gray-200"
              (click)="onToggle(child, $event)">
              <i
                class="material-icons text-sm transition-transform"
                [class.rotate-90]="child.expanded">
                chevron_right
              </i>
              </button>
            } @else {
              <span class="w-6"></span>
            }
            @if (child.icon) {
            <i class="material-icons text-sm text-gray-400">{{ child.icon }}</i>
          }
          <span class="text-sm text-gray-900">{{ child.name }}</span>
        </div>
        @if (child.expanded && child.children) {
          <div class="ml-4 border-l border-gray-200 pl-2">
            @for (grandChild of child.children; track grandChild.name) {
              <ng-container *ngTemplateOutlet="nodeTemplate; context: { $implicit: grandChild }" />
            }
          </div>
        }
      </div>
    </ng-template>
  `
})
export class TreeComponent {
  nodes = input<TreeNode[]>([]);
  nodeClick = output<TreeNode>();
  nodeToggle = output<TreeNode>();

  onNodeClick(node: TreeNode): void {
    this.nodeClick.emit(node);
  }

  onToggle(node: TreeNode, event: Event): void {
    event.stopPropagation();
    node.expanded = !node.expanded;
    this.nodeToggle.emit(node);
  }

  onKeydown(event: KeyboardEvent, node: TreeNode): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onNodeClick(node);
    }
  }

  cn = cn;
}
