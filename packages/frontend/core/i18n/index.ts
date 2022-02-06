import { makeDict } from '../utils/dictionary'
import translations from './translations.json'

// TODO: from json file
type I18nRow = {
  label: string
  en: string
  ja: string
}

export const i18nDict = makeDict(translations, (k: I18nRow) => k.label)
