export const tabsShowcaseCode = {
  importCode: `import { TabsComponent } from '@apsara/ui/tabs';`,

  usageCode: `<app-tabs
  [options]="[
    { value: 'account', label: 'Account' },
    { value: 'password', label: 'Password' }
  ]"
  [modelValue]="activeTab()"
  (changed)="activeTab.set($event)">
  @if (activeTab() === 'account') {
    <p>Account settings content</p>
  }
  @if (activeTab() === 'password') {
    <p>Password settings content</p>
  }
</app-tabs>`,

  accountCode: `<app-tabs
  [options]="[
    { value: 'account', label: 'Account' },
    { value: 'password', label: 'Password' }
  ]"
  [modelValue]="activeTab()"
  (changed)="activeTab.set($event)">
  @if (activeTab() === 'account') {
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-1.5">
        <label>Name</label>
        <input type="text" placeholder="Enter your name" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label>Email</label>
        <input type="email" placeholder="Enter your email" />
      </div>
    </div>
  }
  @if (activeTab() === 'password') {
    <p>Password settings content</p>
  }
</app-tabs>`,

  statesCode: `<app-tabs
  [options]="[
    { value: 'tab1', label: 'Active Tab' },
    { value: 'tab2', label: 'Another Tab' },
    { value: 'tab3', label: 'Disabled', disabled: true }
  ]"
  [modelValue]="activeTab()"
  (changed)="activeTab.set($event)">
  @if (activeTab() === 'tab1') {
    <p>Active tab content</p>
  }
  @if (activeTab() === 'tab2') {
    <p>Another tab content</p>
  }
  @if (activeTab() === 'tab3') {
    <p>Disabled tab content</p>
  }
</app-tabs>`
};
