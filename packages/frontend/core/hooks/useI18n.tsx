import { useRouter } from 'next/router'
import { i18nDict } from '../i18n'
import { toCamelCase } from '../utils/string'

type I18nType = {
    locale?: string
    translate: (label: string, otherLocale?: string) => string
}

export const useI18n = (): I18nType => {
    const { locale } = useRouter()
    const translate =
        (locale: string) => (label: string, otherLocale?: string) => {
            const l =
                i18nDict[label]?.[otherLocale?.toLowerCase() || locale.toLowerCase()] ||
                i18nDict[label]?.['en']
            return l?.split(' ').map(toCamelCase).join(' ')
        }
    return {
        locale,
        translate: translate(locale as string),
    }
}