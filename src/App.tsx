import { useEffect, useLayoutEffect } from 'react'
import { SiteFooter, SiteHeader } from './components/SiteChrome'
import { ContactSection } from './components/ContactSection'
import { useDesignVariant } from './hooks/useDesignVariant'
import { VariantOne } from './variants/VariantOne'
import { VariantTwo } from './variants/VariantTwo'

export function App() {
  const { variant, selectVariant } = useDesignVariant()
  const brutalist = variant === '2'

  useLayoutEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) document.getElementById(hash)?.scrollIntoView()
  }, [variant])

  useEffect(() => {
    if (!brutalist || typeof IntersectionObserver === 'undefined' || typeof Element.prototype.animate !== 'function') return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const main = document.getElementById('main')
    if (!main) return

    const targets = main.querySelectorAll<HTMLElement>([
      '.brutal-detail',
      '.brutal-about-copy',
      '.brutal-section-heading',
      '.brutal-blog-grid > :first-child',
      '.brutal-blog-rail',
      '#contact .section-grid > *',
    ].join(', '))
    const active = new Map<Element, Animation>()
    const revealed = new Set<Element>()
    const shouldSkip = (element: Element) => motionPreference.matches ||
      Boolean(element.closest('main > section')?.matches(':target, :focus-within, :has(:target)'))

    const observer = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting || revealed.has(target) || active.has(target) || shouldSkip(target)) continue

        revealed.add(target)
        const animation = target.animate([{ opacity: .65 }, { opacity: 1 }], {
          duration: 360,
          easing: 'ease-out',
        })
        active.set(target, animation)
        animation.onfinish = () => {
          if (active.get(target) === animation) active.delete(target)
        }
      }
    }, { rootMargin: '24px 0px' })

    // Require the element to move well away before another reveal can play.
    const resetObserver = new IntersectionObserver(entries => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) revealed.delete(target)
      }
    }, { rootMargin: '120px 0px' })

    function cancelSkippedAnimations() {
      for (const [target, animation] of active) {
        if (!shouldSkip(target)) continue
        animation.cancel()
        active.delete(target)
      }
    }

    targets.forEach(target => {
      observer.observe(target)
      resetObserver.observe(target)
    })
    main.addEventListener('focusin', cancelSkippedAnimations)
    window.addEventListener('hashchange', cancelSkippedAnimations)
    motionPreference.addEventListener('change', cancelSkippedAnimations)

    return () => {
      observer.disconnect()
      resetObserver.disconnect()
      active.forEach(animation => animation.cancel())
      main.removeEventListener('focusin', cancelSkippedAnimations)
      window.removeEventListener('hashchange', cancelSkippedAnimations)
      motionPreference.removeEventListener('change', cancelSkippedAnimations)
    }
  }, [brutalist])

  return (
    <div className={brutalist ? 'variant-two' : 'variant-one'}>
      <a className="skip-link" href="#main">К содержанию</a>
      <SiteHeader variant={variant} onSelect={selectVariant} />
      <main id="main">
        {brutalist ? <VariantTwo /> : <VariantOne />}
        <ContactSection brutalist={brutalist} />
      </main>
      <SiteFooter brutalist={brutalist} />
    </div>
  )
}
