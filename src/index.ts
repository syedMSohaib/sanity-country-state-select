import {definePlugin, castFromTyped} from '@sanity-typed/types'
import {schema} from './schemas'

interface MyPluginConfig {
  /* nothing here yet */
}

export const countryStateListPluginTyped = definePlugin((config: MyPluginConfig | void) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-plugin-country-state-select')
  return {
    name: 'sanity-plugin-country-state-select',
    schema: {
      types: [schema],
    },
  }
})

export const countryStateListPlugin = castFromTyped(countryStateListPluginTyped)
