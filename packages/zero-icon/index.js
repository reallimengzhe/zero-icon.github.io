import ZeroIcon from './src/zero-icon'

ZeroIcon.install = Vue => {
  Vue.component(ZeroIcon.name, ZeroIcon)
}

const req = require.context('../../icons', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

// 导出组件
export default ZeroIcon
