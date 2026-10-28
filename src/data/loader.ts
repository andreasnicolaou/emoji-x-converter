import ar from './ar.js';
import de from './de.js';
import el from './el.js';
import en from './en.js';
import es from './es.js';
import fr from './fr.js';
import hi from './hi.js';
import id from './id.js';
import it from './it.js';
import ja from './ja.js';
import ko from './ko.js';
import nl from './nl.js';
import pl from './pl.js';
import pt from './pt.js';
import ru from './ru.js';
import sv from './sv.js';
import th from './th.js';
import tr from './tr.js';
import vi from './vi.js';
import zh from './zh.js';

const languages = {
  en,
  el,
  ko,
  hi,
  id,
  es,
  zh,
  th,
  tr,
  vi,
  sv,
  nl,
  pl,
  fr,
  de,
  ar,
  pt,
  ru,
  ja,
  it,
};

export type LanguageXCode = keyof typeof languages;

export const emojiXLoader: Record<LanguageXCode, Record<string, string>> = languages;
