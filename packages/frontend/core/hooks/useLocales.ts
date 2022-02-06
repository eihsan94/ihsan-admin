import { useRouter } from 'next/router'

type UseLocalesResult = {
  locales?: string[]
  locale?: string
  handleLocale: (locale: string) => void
}
export const useLocales = (): UseLocalesResult => {
  const router = useRouter()
  const handleLocale = (next: string) => {
    router.push(
      { pathname: router.pathname, query: router.query },
      router.asPath,
      { locale: next }
    )
  }
  return {
    locales: router?.locales,
    locale: router.locale,
    handleLocale,
  }
}
