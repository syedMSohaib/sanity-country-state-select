import {State} from '../components/countrySelectList.type'

/** Checks to see if a value is an object */
export function isObject(value?: any): boolean {
  // null is object, hence the extra check
  return value !== null && typeof value === 'object'
}

/** Checks to see if a value is an object and only an object */
export function isPlainObject(value?: any): boolean {
  /* eslint no-proto:0 */
  return isObject(value) && value.__proto__ === Object.prototype
}

/**
 * Is empty plain object
 * Will throw if the value was not a plain object
 */
export function isEmptyPlainObject(value: object): boolean {
  if (!isPlainObject(value)) throw new Error('value was not a plain object')
  // We could use Object.keys, but this is more effecient
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

export function formattedStates(value: State[]): State[] {
  return value.map((item: State) => {
    return {
      key: item.key,
      name: item.name,
      value: item.name,
      state_code: item.state_code,
      latitude: item.latitude,
      longitude: item.longitude,
      type: item.type,
    }
  })
}
