export function parseQueryParams<T>(params: any): T {
  const parsedParams = {} as any

  Object.keys(params).forEach((key) => {
    if (params[key]) {
      parsedParams[key] = params[key]
    }
  })

  return parsedParams as T
}
