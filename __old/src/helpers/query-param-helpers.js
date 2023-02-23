function objectToParams(object) {
const params = new URLSearchParams
  Object.entries(object).map(entry => {
    let [key, value] = entry
    params.set(key, value)
  })
  return params.toString()
}

function paramsToObject(paramString) {
  const params = new URLSearchParams(paramString)
  const object = {}
  for (const [key, value] of params.entries()) {
    object[key] = value
  }
  return object
}

export {
  objectToParams,
  paramsToObject
}
