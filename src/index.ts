import {definePlugin, castFromTyped} from '@sanity-typed/types'
import {schema} from './schemas'

interface MyPluginConfig {
  /* nothing here yet */
}

export const countryStateListPluginTyped = definePlugin((config: MyPluginConfig | void) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-country-state-select')
  return {
    name: 'sanity-country-state-select',
    schema: {
      types: [schema],
    },
  }
})

export const countryStateListPlugin = castFromTyped(countryStateListPluginTyped)
