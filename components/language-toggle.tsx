import type { NavbarLanguage } from "./navbar";

export function LanguageToggle({ lang, onLangChange }: { lang: NavbarLanguage; onLangChange: (lang: NavbarLanguage) => void }) {
  return (
    <div className="language-toggle" aria-label="Language selector">
      <button type="button" onClick={() => onLangChange("id")} aria-pressed={lang === "id"} className={lang === "id" ? "is-active" : ""}>ID</button>
      <button type="button" onClick={() => onLangChange("en")} aria-pressed={lang === "en"} className={lang === "en" ? "is-active" : ""}>EN</button>
    </div>
  );
}
