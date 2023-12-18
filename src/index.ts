import {definePlugin} from 'sanity'
import {schema} from './schemas'

interface MyPluginConfig {
  /* nothing here yet */
}

export const countryStateListPlugin = definePlugin<MyPluginConfig | void>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-plugin-country-state-select')
  return {
    name: 'sanity-plugin-country-state-select',
    schema: {
      types: [schema],
    },
  }
})
