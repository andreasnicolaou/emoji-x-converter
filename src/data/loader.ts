import ar from './ar';
import de from './de';
import el from './el';
import en from './en';
import es from './es';
import fr from './fr';
import hi from './hi';
import id from './id';
import it from './it';
import ja from './ja';
import ko from './ko';

import nl from './nl';
import pl from './pl';
import pt from './pt';
import ru from './ru';
import sv from './sv';
import th from './th';
import tr from './tr';
import vi from './vi';
import zh from './zh';
type LanguageType =
  | 'en'
  | 'el'
  | 'ko'
  | 'hi'
  | 'id'
  | 'es'
  | 'zh'
  | 'th'
  | 'tr'
  | 'vi'
  | 'sv'
  | 'nl'
  | 'pl'
  | 'fr'
  | 'de'
  | 'ar'
  | 'pt'
  | 'ru'
  | 'ja'
  | 'it';

export const emojiXLoader: Record<LanguageType, Record<string, string>> = {
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

export type LanguageXCode = keyof typeof emojiXLoader;
