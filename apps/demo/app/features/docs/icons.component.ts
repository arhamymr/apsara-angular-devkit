import { Component } from '@angular/core';
import { LucideAngularModule, House, Pencil, Trash2, Plus, Search, Settings, Save, Download, Upload, RefreshCw, X, Check, XCircle, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Menu, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, CheckCircle, AlertTriangle, AlertCircle, Info, RotateCw, Sun, Moon, Mail, MessageSquare, Phone, Bell, Share2, Star, Heart, BadgeCheck } from 'lucide-angular';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <section class="mb-16 scroll-m-20">
      <h1 class="text-[32px] font-bold text-[color:var(--foreground,#1a1b1f)] mb-2 pb-4 border-b border-[var(--border,#e0e0e0)]">Icons</h1>
      <p class="text-lg text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">
        Apsara uses Lucide icons as its default icon system. Icons are imported directly from lucide-angular.
      </p>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Basic Usage</h2>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>import {{ '{' }} LucideAngularModule, House {{ '}' }} from 'lucide-angular';

@Component({{ '{' }}
  standalone: true,
  imports: [LucideAngularModule],
  template: \`&lt;lucide-angular [img]="House" /&gt;\`
{{ '}' }})
export class ExampleComponent {{ '{' }}
  House = House;
{{ '}' }}</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Sizes</h2>
      <p class="text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">The size prop controls the icon size in pixels:</p>
      <div class="flex items-center gap-6 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <div class="flex flex-col items-center gap-2">
          <lucide-angular [img]="House" [size]="12" />
          <span class="text-xs text-[var(--dimmed,#666)]">12px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <lucide-angular [img]="House" [size]="16" />
          <span class="text-xs text-[var(--dimmed,#666)]">16px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <lucide-angular [img]="House" [size]="20" />
          <span class="text-xs text-[var(--dimmed,#666)]">20px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <lucide-angular [img]="House" [size]="24" />
          <span class="text-xs text-[var(--dimmed,#666)]">24px</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <lucide-angular [img]="House" [size]="32" />
          <span class="text-xs text-[var(--dimmed,#666)]">32px</span>
        </div>
      </div>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>&lt;lucide-angular [img]="House" [size]="12" /&gt;
&lt;lucide-angular [img]="House" [size]="16" /&gt;
&lt;lucide-angular [img]="House" [size]="20" /&gt;
&lt;lucide-angular [img]="House" [size]="24" /&gt;
&lt;lucide-angular [img]="House" [size]="32" /&gt;</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Icon Categories</h2>

      <h3 class="text-xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-8 mb-4">Action Icons</h3>
      <div class="flex flex-wrap gap-4 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <lucide-angular [img]="Pencil" />
        <lucide-angular [img]="Trash2" />
        <lucide-angular [img]="Plus" />
        <lucide-angular [img]="Search" />
        <lucide-angular [img]="Settings" />
        <lucide-angular [img]="Save" />
        <lucide-angular [img]="Download" />
        <lucide-angular [img]="Upload" />
        <lucide-angular [img]="RefreshCw" />
        <lucide-angular [img]="X" />
        <lucide-angular [img]="Check" />
        <lucide-angular [img]="XCircle" />
      </div>

      <h3 class="text-xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-8 mb-4">Navigation Icons</h3>
      <div class="flex flex-wrap gap-4 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <lucide-angular [img]="ChevronLeft" />
        <lucide-angular [img]="ChevronRight" />
        <lucide-angular [img]="ChevronDown" />
        <lucide-angular [img]="ChevronUp" />
        <lucide-angular [img]="Menu" />
        <lucide-angular [img]="ArrowLeft" />
        <lucide-angular [img]="ArrowRight" />
        <lucide-angular [img]="ArrowDown" />
        <lucide-angular [img]="ArrowUp" />
        <lucide-angular [img]="House" />
      </div>

      <h3 class="text-xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-8 mb-4">Status Icons</h3>
      <div class="flex flex-wrap gap-4 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <lucide-angular [img]="Info" />
        <lucide-angular [img]="AlertTriangle" />
        <lucide-angular [img]="AlertCircle" />
        <lucide-angular [img]="CheckCircle" />
        <lucide-angular [img]="XCircle" />
        <lucide-angular [img]="Info" />
        <lucide-angular [img]="RotateCw" />
        <lucide-angular [img]="RotateCw" />
      </div>

      <h3 class="text-xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-8 mb-4">Communication Icons</h3>
      <div class="flex flex-wrap gap-4 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <lucide-angular [img]="Mail" />
        <lucide-angular [img]="MessageSquare" />
        <lucide-angular [img]="Phone" />
        <lucide-angular [img]="Bell" />
        <lucide-angular [img]="Share2" />
      </div>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Custom Styling</h2>
      <p class="text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">Use the class prop to apply custom styles:</p>
      <div class="flex items-center gap-4 my-4 p-4 bg-[var(--card,#fff)] border border-[var(--border,#e0e0e0)] rounded-lg">
        <lucide-angular [img]="House" class="text-red-500" />
        <lucide-angular [img]="Star" class="text-yellow-500" />
        <lucide-angular [img]="Heart" class="text-pink-500" />
        <lucide-angular [img]="BadgeCheck" class="text-blue-500" />
      </div>
      <pre class="bg-[var(--popover,#f5f5f5)] text-[color:var(--foreground,#1a1b1f)] p-5 rounded-lg overflow-x-auto text-sm leading-relaxed my-4"><code>&lt;lucide-angular [img]="House" class="text-red-500" /&gt;
&lt;lucide-angular [img]="Star" class="text-yellow-500" /&gt;
&lt;lucide-angular [img]="Heart" class="text-pink-500" /&gt;</code></pre>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">Props</h2>
      <table class="w-full border-collapse my-4 text-sm bg-background rounded-lg overflow-hidden shadow-sm border border-[var(--border,#e0e0e0)]">
        <thead>
          <tr>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Prop</th>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Type</th>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Default</th>
            <th class="text-left p-3 border-b border-[var(--border,#e0e0e0)] bg-[var(--surface-variant,#f5f5f5)] font-semibold text-[color:var(--foreground-variant,#666)] text-xs uppercase tracking-wide">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">img</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">LucideIcon</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">required</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Lucide icon component (e.g., House, Settings)</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">size</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">number</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">24</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Size of the icon in pixels</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">strokeWidth</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">number</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">2</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Stroke width of the icon</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">color</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">string</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">'currentColor'</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Color of the icon</td>
          </tr>
          <tr>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]"><code class="bg-[var(--surface-variant,#f5f5f5)] px-1.5 py-0.5 rounded text-xs">class</code></td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">string</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">''</td>
            <td class="p-3 border-b border-[var(--border,#e0e0e0)] text-[color:var(--foreground,#1a1b1f)]">Additional CSS classes to apply</td>
          </tr>
        </tbody>
      </table>

      <h2 class="text-2xl font-semibold text-[color:var(--foreground,#1a1b1f)] mt-10 mb-4">All Available Icons</h2>
      <p class="text-[color:var(--foreground-variant,#666)] my-4 leading-relaxed">
        For a complete list of available Lucide icons, visit the 
        <a href="https://lucide.dev/icons" target="_blank" class="text-[color:var(--primary,#005cbb)] hover:underline">Lucide Icons</a> gallery.
      </p>
    </section>
  `
})
export class IconsComponent {
  House = House;
  Pencil = Pencil;
  Trash2 = Trash2;
  Plus = Plus;
  Search = Search;
  Settings = Settings;
  Save = Save;
  Download = Download;
  Upload = Upload;
  RefreshCw = RefreshCw;
  X = X;
  Check = Check;
  XCircle = XCircle;
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;
  ChevronDown = ChevronDown;
  ChevronUp = ChevronUp;
  Menu = Menu;
  ArrowLeft = ArrowLeft;
  ArrowRight = ArrowRight;
  ArrowUp = ArrowUp;
  ArrowDown = ArrowDown;
  CheckCircle = CheckCircle;
  AlertTriangle = AlertTriangle;
  AlertCircle = AlertCircle;
  Info = Info;
  RotateCw = RotateCw;
  Sun = Sun;
  Moon = Moon;
  Mail = Mail;
  MessageSquare = MessageSquare;
  Phone = Phone;
  Bell = Bell;
  Share2 = Share2;
  Star = Star;
  Heart = Heart;
  BadgeCheck = BadgeCheck;
}
