import { Injectable, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser, DOCUMENT } from '@angular/common'
import { Router, NavigationEnd } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private id = ''

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {
    if (!isPlatformBrowser(this.platformId)) return
    const meta = this.document.querySelector('meta[name="ga-measurement-id"]')
    const value = (meta?.getAttribute('content') || '').trim()
    if (!value) return
    this.id = value
    this.loadTag()
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.pageView(e.urlAfterRedirects)
      }
    })
  }

  private loadTag() {
    const script = this.document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.id}`
    this.document.head.appendChild(script)
    ;(window as any).dataLayer = (window as any).dataLayer || []
    const gtag = (...args: any[]) => {
      ;(window as any).dataLayer.push(args)
    }
    ;(window as any).gtag = gtag
    gtag('js', new Date())
    gtag('config', this.id)
  }

  private pageView(path: string) {
    const gtag = (window as any).gtag as ((...args: any[]) => void) | undefined
    if (!gtag) return
    gtag('config', this.id, { page_path: path })
  }
}
