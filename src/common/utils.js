
// 防抖方法
// 间隔多长时间没有进行某操作（eg:往输入框输入）了在执行
export function debounce(func, delay) {//delay 时间
         let timer = null;
         return function (...args) {
                  if (timer) clearTimeout(timer)
                  timer = setTimeout(() => {
                           // func.apply(this,args)
                           func.apply(this,args)

                  }, delay)
         }
}