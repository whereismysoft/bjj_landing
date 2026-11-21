import { useLayoutEffect } from 'react'
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
