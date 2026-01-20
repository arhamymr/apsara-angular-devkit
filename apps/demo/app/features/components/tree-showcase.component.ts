import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent, TreeNode, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent } from '@apsara/ui';
import { CodeSnippetComponent } from '../../shared/components/code-snippet/code-snippet.component';

interface TreeProp {
  name: string;
  type: string;
  description: string;
}

@Component({
  selector: 'app-tree-showcase',
  standalone: true,
  imports: [CommonModule, TreeComponent, AlertComponent, AlertTitleComponent, AlertDescriptionComponent, CardComponent, TabsComponent, TableComponent, CodeSnippetComponent],
  template: `
    <app-alert variant="warning" class="mb-6">
      <app-alert-title>AI Generated Content</app-alert-title>
      <app-alert-description>This component code may have been AI generated. Please review and verify before using in production.</app-alert-description>
    </app-alert>
    <section id="tree" class="mb-16 scroll-m-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Tree</h2>
        <p class="text-dimmed">A tree component for displaying hierarchical data</p>
      </div>

      <app-card>
        <app-tabs [options]="previewCodeOptions" [modelValue]="basicTab()" (changed)="basicTab.set($event)">
          @if (basicTab() === 'preview') {
            <div class="p-6">
              <app-tree [nodes]="nodes()" (nodeClick)="onNodeClick($event)" />
              <div class="p-4 bg-blue-50 rounded-lg mt-4">
                <p class="text-sm text-blue-600">
                  <strong>Selected:</strong> {{ selectedNode() || 'None' }}
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
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Prop</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Type</th>
          <th class="text-left p-3 border-b border-border bg-tertiary font-semibold text-dimmed text-xs uppercase tracking-wide">Description</th>
        </ng-template>
        <ng-template #tableCell let-prop>
          <td class="p-3 border-b border-border text-foreground"><code class="bg-tertiary px-1.5 py-0.5 rounded text-xs">{{ prop.name }}</code></td>
          <td class="p-3 border-b border-border text-foreground text-dimmed">{{ prop.type }}</td>
          <td class="p-3 border-b border-border text-foreground">{{ prop.description }}</td>
        </ng-template>
        <app-table [rows]="propsData()" [tableHeaderTemplate]="tableHeader" [tableCellTemplate]="tableCell" />
      </div>
    </section>
  `
})
export class TreeShowcaseComponent {
  previewCodeOptions = [
    { value: 'preview', label: 'Preview' },
    { value: 'code', label: 'Code' }
  ];

  basicTab = signal<string>('preview');

  nodes = signal<TreeNode[]>([
    {
      name: 'src',
      icon: 'folder',
      expanded: true,
      children: [
        { name: 'app', icon: 'folder', children: [
          { name: 'app.component.ts', icon: 'description' },
          { name: 'app.module.ts', icon: 'description' }
        ]},
        { name: 'assets', icon: 'folder', children: [
          { name: 'logo.png', icon: 'image' }
        ]}
      ]
    },
    { name: 'package.json', icon: 'description' },
    { name: 'tsconfig.json', icon: 'description' }
  ]);
  selectedNode = signal<string>('');

  installCode = `npm install @apsara/ui/tree`;

  importCode = `import { TreeComponent, TreeNode } from '@apsara/ui/tree';`;

  usageCode = `<app-tree
  [nodes]="treeNodes"
  (nodeClick)="onNodeClick($event)" />`;

  basicCode = `<app-tree
  [nodes]="nodes()"
  (nodeClick)="onNodeClick($event)" />`;

  propsData = (): TreeProp[] => [
    { name: 'nodes', type: 'TreeNode[]', description: 'Array of tree nodes' },
    { name: 'nodeClick', type: 'EventEmitter<TreeNode>', description: 'Emitted when node is clicked' }
  ];

  onNodeClick(node: TreeNode): void {
    this.selectedNode.set(node.name);
  }
}
