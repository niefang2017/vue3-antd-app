import useCommonStore from './modules/common'
import useUserStore from './modules/user'
export default function useStore() {
  return {
    user: useUserStore(),
    common: useCommonStore()
  }
}
