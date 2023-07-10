import {definePlugin} from 'sanity'
import {schema} from './schemas'

interface MyPluginConfig {
  /* nothing here yet */
}

export const countryStateListPlugin = definePlugin<MyPluginConfig | void>((config = {}) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-country-state-select')
  return {
    name: 'sanity-country-state-select',
    schema: {
      types: [schema],
    },
  }
})
