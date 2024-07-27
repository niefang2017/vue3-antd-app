export function useDesign(scope) {
  const prefixCls = 'jxy'
  return {
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls
  }
}
