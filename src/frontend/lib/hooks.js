import { useQuery as useQueryHook } from '@apollo/react-hooks'

export const useQuery = (options) => {
  return useQueryHook(options.query, {
    variables: options.variables,
    notifyOnNetworkStatusChange: true
  })
}
