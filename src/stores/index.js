import useCommonStore from './common'
import useUserStore from './user'
export default function useStore() {
  return {
    user: useUserStore(),
    common: useCommonStore()
  }
}
