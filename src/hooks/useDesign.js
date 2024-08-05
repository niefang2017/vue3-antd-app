export function useDesign(scope) {
  const prefixCls = 'nief'
  return {
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls
  }
}
