import {SearchIcon} from '@sanity/icons'
import {Autocomplete, Box, Card, Flex, Stack, Text} from '@sanity/ui'
import {useCallback, useMemo, useState} from 'react'
import {PatchEvent, set, unset} from 'sanity'
import data from '../data/data'
import {formattedStates, isEmptyPlainObject, isObject} from '../utils'
import {CountryListOption, CountrySelectListProps} from './countrySelectList.type'

export const CountrySelectList = (props: CountrySelectListProps) => {
  const {onChange, schemaType: type, readOnly, value} = props
  //@ts-ignore
  const {sn_ct_st} = value
  const [currentCountry, setCurrentCountry] = useState<any>(sn_ct_st.selected_country || {})
  const [currentState, setCurrentState] = useState<string>(sn_ct_st.selected_state.name)
  const {options} = type

  //@ts-ignore
  const {showStates, showIcon, placeholder}: CountryListOption = options

  const countries = useMemo(() => {
    return data.map((item: any) => {
      return {
        key: item.iso2,
        text: item.name,
        value: item.iso2,
        payload: {
          icon: item.emoji,
        },
      }
    })
  }, [data])

  const handleCountryChange = useCallback(
    (selection: string) => {
      console.log(selection)
      if (selection === '') {
        setCurrentCountry({})
        onChange(PatchEvent.from(unset()))
      } else {
        //fetch country detail
        const selectionDetail = data.find((i) => i.iso2 === selection)
        if (isObject(currentCountry) && !isEmptyPlainObject(selectionDetail as object)) {
          setCurrentCountry(selectionDetail)
          onChange(PatchEvent.from(set({sn_ct_st: {selected_country: selectionDetail}})))
        }
      }
    },
    [currentCountry, onChange],
  )

  const handleStateChange = useCallback(
    (selection: string) => {
      if (selection === '') {
        setCurrentState('')
        onChange(PatchEvent.from(unset()))
      } else {
        const selectionDetail = formattedStates(currentCountry?.states).find(
          (i) => i.name === selection,
        )
        setCurrentState(selection)
        //@ts-ignore
        value.sn_ct_st.selected_state = selectionDetail
        onChange(PatchEvent.from(set(value)))
      }
    },
    [currentState, onChange],
  )

  return (
    <>
      <Box paddingTop={2}>
        <Stack space={[3, 3, 3, 3]}>
          <Autocomplete
            value={currentCountry?.name}
            fontSize={[2, 2, 2]}
            filterOption={(query, option) =>
              option?.text.toLowerCase().indexOf(query.toLowerCase()) > -1
            }
            icon={SearchIcon}
            id="sn-countries-list"
            options={countries}
            openButton
            placeholder={placeholder || 'Select'}
            onSelect={handleCountryChange}
            onChange={handleCountryChange}
            renderOption={(option) => (
              <Card as="button">
                <Box flex={1} padding={3}>
                  <Text size={[2, 2, 3]}>
                    {showIcon && option?.payload?.icon} {option?.text}
                  </Text>
                </Box>
              </Card>
            )}
            renderValue={(value, option) => option?.text || value}
          />
          {/* Render States List if its true from props */}
          {showStates && currentCountry?.states && (
            <Flex direction={'column'} marginTop={2}>
              <Card marginBottom={4}>
                <Text align="left">State</Text>
              </Card>
              <Autocomplete
                value={currentState}
                fontSize={[2, 2, 2]}
                filterOption={(query, option) =>
                  option?.value.toLowerCase().indexOf(query.toLowerCase()) > -1
                }
                icon={SearchIcon}
                id="sn-state-list"
                options={formattedStates(currentCountry?.states)}
                openButton
                placeholder={'Select states'}
                onSelect={(e) => handleStateChange(e)}
                onChange={(e) => handleStateChange(e)}
                renderOption={(option) => (
                  <Card as="button">
                    <Box flex={1} padding={3}>
                      <Text size={[2, 2, 3]}>{option.value}</Text>
                    </Box>
                  </Card>
                )}
                renderValue={(option) => {
                  //@ts-ignore
                  return option
                }}
              />
            </Flex>
          )}
        </Stack>
      </Box>
    </>
  )
}
