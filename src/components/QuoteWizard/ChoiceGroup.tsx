import type { QuoteOption } from "@/data/quoteOptions";

interface ChoiceGroupProps {
  name: string;
  legend: string;
  options: QuoteOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  swatches?: Record<string, string>;
  columns?: string;
}

/** Native radio inputs styled as cards: arrow-key navigation and screen-reader semantics come for free. */
const ChoiceGroup = ({ name, legend, options, value, onChange, error, swatches, columns = "sm:grid-cols-2" }: ChoiceGroupProps) => (
  <fieldset aria-describedby={error ? `${name}-error` : undefined}>
    <legend className="sr-only">{legend}</legend>
    <div className={`grid gap-3 ${columns}`}>
      {options.map((opt, i) => (
        <label key={opt.value} className="relative cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            aria-invalid={!!error}
            id={i === 0 ? name : undefined}
            className="peer sr-only"
          />
          <span className="flex min-h-[64px] items-center gap-3 border-2 border-border p-4 transition-colors hover:border-accent/40 peer-checked:border-accent peer-checked:bg-accent/5 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
            {swatches && (
              <span
                aria-hidden="true"
                className="h-7 w-7 shrink-0 rounded-full border border-border"
                style={{ background: swatches[opt.value] }}
              />
            )}
            <span>
              <span className="block font-heading font-bold text-foreground">{opt.label}</span>
              {opt.desc && <span className="block text-sm font-body text-muted-foreground">{opt.desc}</span>}
            </span>
          </span>
        </label>
      ))}
    </div>
    {error && (
      <p id={`${name}-error`} role="alert" className="mt-3 text-xs text-destructive">
        {error}
      </p>
    )}
  </fieldset>
);

export default ChoiceGroup;
