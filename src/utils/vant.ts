// 由于采用了按需加载，函数氏的引用，必须手动加载样式，故将所有使用到的函数方法统一引入
export { showDialog, showConfirmDialog, showToast } from 'vant'
import 'vant/es/toast/style'
import 'vant/es/dialog/style'

// export { showNotify, showImagePreview } from 'vant'
// import 'vant/es/notify/style'
// import 'vant/es/image-preview/style'
