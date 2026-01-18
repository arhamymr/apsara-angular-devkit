import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent, TabsListComponent, TabsItemComponent, TabsPanelComponent } from './index';

@Component({
  selector: 'app-tabs-showcase',
  standalone: true,
  imports: [CommonModule, TabsComponent, TabsListComponent, TabsItemComponent, TabsPanelComponent],
  template: `
    <div class="tabs-showcase">
      <div class="showcase-section">
        <h3 class="section-title">Account Settings</h3>
        <p class="section-description">Form with tabbed sections for account, password, and settings.</p>
        
        <app-tabs [defaultValue]="'account'" class="preview-tabs">
          <app-tabs-list>
            <app-tabs-item value="account">Account</app-tabs-item>
            <app-tabs-item value="password">Password</app-tabs-item>
            <app-tabs-item value="settings">Settings</app-tabs-item>
          </app-tabs-list>

          <app-tabs-panel value="account">
            <div class="panel-form">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" placeholder="Enter your name" />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" placeholder="Enter your email" />
              </div>
              <div class="form-group">
                <label class="form-label">Bio</label>
                <textarea class="form-input" rows="3" placeholder="Tell us about yourself"></textarea>
              </div>
            </div>
          </app-tabs-panel>

          <app-tabs-panel value="password">
            <div class="panel-form">
              <div class="form-group">
                <label class="form-label">Current Password</label>
                <input type="password" class="form-input" placeholder="Enter current password" />
              </div>
              <div class="form-group">
                <label class="form-label">New Password</label>
                <input type="password" class="form-input" placeholder="Enter new password" />
              </div>
              <div class="form-group">
                <label class="form-label">Confirm Password</label>
                <input type="password" class="form-input" placeholder="Confirm new password" />
              </div>
            </div>
          </app-tabs-panel>

          <app-tabs-panel value="settings">
            <div class="panel-form">
              <div class="form-group">
                <label class="form-label">Language</label>
                <select class="form-input">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Timezone</label>
                <select class="form-input">
                  <option>UTC</option>
                  <option>EST</option>
                  <option>PST</option>
                </select>
              </div>
              <div class="form-group checkbox-group">
                <input type="checkbox" id="notifications" />
                <label for="notifications">Enable email notifications</label>
              </div>
            </div>
          </app-tabs-panel>
        </app-tabs>
      </div>

      <div class="showcase-section">
        <h3 class="section-title">Product Details</h3>
        <p class="section-description">Tabbed product information with description, specs, and reviews.</p>
        
        <app-tabs [defaultValue]="'description'" class="preview-tabs">
          <app-tabs-list>
            <app-tabs-item value="description">Description</app-tabs-item>
            <app-tabs-item value="specs">Specifications</app-tabs-item>
            <app-tabs-item value="reviews">Reviews</app-tabs-item>
          </app-tabs-list>

          <app-tabs-panel value="description">
            <div class="panel-content">
              <p>This is a premium product designed with user experience in mind. It features a clean, modern design that adapts seamlessly to any application.</p>
              <p>Built with Angular Signals and Material Design, it provides excellent performance and accessibility out of the box.</p>
            </div>
          </app-tabs-panel>

          <app-tabs-panel value="specs">
            <div class="specs-list">
              <div class="spec-item">
                <span class="spec-label">Material</span>
                <span class="spec-value">High-grade aluminum</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Weight</span>
                <span class="spec-value">250g</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Dimensions</span>
                <span class="spec-value">150mm x 80mm x 25mm</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Warranty</span>
                <span class="spec-value">2 years</span>
              </div>
            </div>
          </app-tabs-panel>

          <app-tabs-panel value="reviews">
            <div class="reviews-list">
              <div class="review-item">
                <div class="review-header">
                  <span class="review-author">John Doe</span>
                  <span class="review-rating">★★★★★</span>
                </div>
                <p class="review-text">Excellent product! Highly recommend to anyone looking for quality.</p>
              </div>
              <div class="review-item">
                <div class="review-header">
                  <span class="review-author">Jane Smith</span>
                  <span class="review-rating">★★★★☆</span>
                </div>
                <p class="review-text">Great quality, fast shipping. Very satisfied with my purchase.</p>
              </div>
            </div>
          </app-tabs-panel>
        </app-tabs>
      </div>
    </div>
  `,
  styles: [`
    .tabs-showcase {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .showcase-section {
      padding: 24px;
      background: var(--color-background-secondary);
      border-radius: 12px;
    }

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--color-text-primary);
      margin: 0 0 8px;
    }

    .section-description {
      font-size: 14px;
      color: var(--color-text-secondary);
      margin: 0 0 20px;
    }

    .preview-tabs {
      display: block;
    }

    .panel-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text-primary);
    }

    .form-input {
      padding: 10px 14px;
      border: 1px solid var(--color-border);
      border-radius: 8px;
      background: var(--color-background);
      color: var(--color-text-primary);
      font-size: 14px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--primary/20);
    }

    .checkbox-group {
      flex-direction: row;
      align-items: center;
      gap: 10px;
    }

    .checkbox-group input {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }

    .checkbox-group label {
      font-size: 14px;
      color: var(--color-text-primary);
      cursor: pointer;
    }

    .panel-content {
      font-size: 14px;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    .panel-content p {
      margin: 0 0 12px;
    }

    .panel-content p:last-child {
      margin-bottom: 0;
    }

    .specs-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .spec-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid var(--color-border);
    }

    .spec-item:last-child {
      border-bottom: none;
    }

    .spec-label {
      font-size: 14px;
      color: var(--color-text-secondary);
    }

    .spec-value {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text-primary);
    }

    .reviews-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .review-item {
      padding: 16px;
      background: var(--color-background);
      border-radius: 8px;
    }

    .review-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    .review-author {
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text-primary);
    }

    .review-rating {
      color: #ffc107;
      font-size: 14px;
    }

    .review-text {
      font-size: 14px;
      color: var(--color-text-secondary);
      margin: 0;
    }
  `]
})
export class TabsShowcaseComponent {
  activeTab = signal<string>('account');
}
