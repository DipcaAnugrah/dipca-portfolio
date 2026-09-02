type Locale = "en" | "id";

export function LanguageToggle({ locale, onChange }: { locale: Locale; onChange: (locale: Locale) => void }) {
  return (
    <div className="flex items-center rounded-full border border-white/15 p-0.5" aria-label="Language selector">
      <button type="button" onClick={() => onChange("id")} aria-pressed={locale === "id"} className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition ${locale === "id" ? "bg-[#d7ff75] text-[#10110f]" : "text-white/45 hover:text-white"}`}>ID</button>
      <button type="button" onClick={() => onChange("en")} aria-pressed={locale === "en"} className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition ${locale === "en" ? "bg-[#d7ff75] text-[#10110f]" : "text-white/45 hover:text-white"}`}>EN</button>
    </div>
  );
}
