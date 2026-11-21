import type { DesignVariant } from '../hooks/useDesignVariant'

export type VariantSwitcherProps = {
  variant: DesignVariant
  onSelect: (variant: DesignVariant) => void
}

const options = [
  ['1', 'V1 — Current'],
  ['2', 'V2 — Brutalist'],
] as const

export function VariantSwitcher({ variant, onSelect }: VariantSwitcherProps) {
  return (
    <div className="variant-switcher" role="group" aria-label="Вариант дизайна">
      {options.map(([value, label]) => (
        <button key={value} type="button" aria-pressed={variant === value} onClick={() => onSelect(value)}>
          {label}
        </button>
      ))}
    </div>
  )
}
