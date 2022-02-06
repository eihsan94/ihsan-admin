import { Select } from '@chakra-ui/react'
import { useI18n } from 'core/hooks/useI18n'
import { useLocales } from 'core/hooks/useLocales'
import React from 'react'

interface Props { }

function LanguageButton(props: Props) {
    const { locale, translate } = useI18n()
    const { locales, handleLocale } = useLocales()

    return (
        <>
            {locales &&
                <Select w={{ base: "100%", md: "fit-content" }} value={locale} onChange={(e) => handleLocale(e.target.value)}>
                    {locales.map((e) => (
                        <option
                            key={e}
                            value={e}
                            label={translate('LANGUAGE', e)}
                        />
                    ))}
                </Select>
            }
        </>
    )
}

export default LanguageButton



