import useUserStore from './user'
import useCommonStore from './common'
export default function useStore() {
  return {
    user: useUserStore(),
    common: useCommonStore()
  }
}
