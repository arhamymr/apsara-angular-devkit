import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsComponent, TabsListComponent, TabsItemComponent, TabsPanelComponent } from '@apsara/ui';
import { FieldComponent, FieldLabelComponent, FieldsetComponent, FieldsetLegendComponent } from '@apsara/ui';
import { InputComponent } from '@apsara/ui';

@Component({
  selector: 'app-tabs-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TabsComponent,
    TabsListComponent,
    TabsItemComponent,
    TabsPanelComponent,
    FieldComponent,
    FieldLabelComponent,
    FieldsetComponent,
    FieldsetLegendComponent,
    InputComponent
  ],
  template: `
    <div id="tabs" class="p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-foreground mb-2">Tabs Component Demo</h2>
        <p class="text-dimmed">Account settings form using tabs pattern</p>
      </div>
      
      <app-tabs [defaultValue]="'account'" class="lg:w-6/12 w-full">
        <app-tabs-list>
          <app-tabs-item [value]="'account'">Account</app-tabs-item>
          <app-tabs-item [value]="'password'">Password</app-tabs-item>
        </app-tabs-list>
        
        <app-tabs-panel [value]="'account'">
          <app-fieldset>
            <app-fieldset-legend>Account</app-fieldset-legend>
            
            <app-field>
              <app-field-label>Name</app-field-label>
              <app-input 
                id="name" 
                placeholder="Enter your name" 
                [required]="true"
                [(ngModel)]="accountForm.name">
              </app-input>
            </app-field>
            
            <app-field>
              <app-field-label>Email</app-field-label>
              <app-input 
                id="email" 
                placeholder="Enter your email" 
                [required]="true"
                type="email"
                [(ngModel)]="accountForm.email">
              </app-input>
            </app-field>
          </app-fieldset>
        </app-tabs-panel>
        
        <app-tabs-panel [value]="'password'">
          <app-fieldset>
            <app-fieldset-legend>Password</app-fieldset-legend>
            
            <app-field>
              <app-field-label>Password</app-field-label>
              <app-input 
                id="password" 
                placeholder="Enter your password" 
                [required]="true"
                type="password"
                [(ngModel)]="accountForm.password">
              </app-input>
            </app-field>
            
            <app-field>
              <app-field-label>Confirm Password</app-field-label>
              <app-input 
                id="confirm-password" 
                placeholder="Enter your confirm password" 
                [required]="true"
                type="password"
                [(ngModel)]="accountForm.confirmPassword">
              </app-input>
            </app-field>
          </app-fieldset>
        </app-tabs-panel>
      </app-tabs>
    </div>
  `
})
export class TabsShowcaseComponent {
  accountForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
}
