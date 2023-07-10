import {ObjectInputProps, ObjectOptions, ObjectSchemaType} from 'sanity'

export interface State {
  key: string
  name: string
  value: string
  state_code: string
  latitude: number
  longitude: number
  type: string
}

export interface CountryListOption extends Omit<ObjectOptions, 'columns'> {
  showStates?: boolean
  showIcon?: boolean
  placeholder?: string
  exclude?: string[] //exclude mentioned countries from dropdown result
  include?: string[] //Only include the countries in dropdown
}

export type CountryListSchemaType = Omit<ObjectSchemaType, 'options'> & {
  options?: CountryListOption
  selected_state?: State
}

export type CountrySelectListProps = ObjectInputProps<CountryListOption, CountryListSchemaType>
