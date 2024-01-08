import {defineType, ObjectDefinition} from '@sanity-typed/types'
import {CountryListOption} from '../components/countrySelectList.type'
import {CountrySelectList} from '../components/CountrySelectList'

const countryType = 'countrieslist' as const

export interface CountryListTypeDefinition
  extends Omit<ObjectDefinition<any, any>, 'type' | 'fields' | 'options'> {
  type: typeof countryType
  options?: CountryListOption
}

declare module '@sanity/types' {
  // Define the type of plugin, when using defineType, defineField & DefineArrayMember
  export interface IntrinsicDefinitions {
    countrieslist: CountryListTypeDefinition
  }
}

export const schema = defineType({
  name: countryType,
  type: 'object',
  title: 'CountryList',
  ...({components: {input: CountrySelectList}} as {}),
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'value',
      type: 'string',
    },
  ],
})
