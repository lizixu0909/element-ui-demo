export default {
  // 参数转换
  // parseParam (param, key) {
  //   let paramStr = ''
  //   if (typeof (param) === 'string' || typeof (param) === 'number' || typeof (param) === 'boolean') {
  //     if (param && param !== '' && param !== null && param !== undefined) {
  //       paramStr += '&' + key + '=' + param
  //     }
  //   } else {
  //     let i
  //     for (i in param) {
  //       var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
  //       if (param[i] && param[i] !== '' && param[i] != null && param[i] !== undefined && param[i].length > 0) {
  //         paramStr += '&' + this.parseParam(param[i], k)
  //       }
  //     }
  //   }
  //   return paramStr.substr(1)
  // },
  // 方法成熟 用于Servlet底层的参数转换
  parseParams (params, parentObjectStr = '', resultParams = new URLSearchParams()) {
    if (!resultParams && resultParams === null && !(resultParams instanceof URLSearchParams)) {
      resultParams = new URLSearchParams()
    }
    if (!params || params === null || Object.keys(params) === 0) {
      return resultParams
    }
    parentObjectStr = parentObjectStr === '' ? '' : parentObjectStr + '.'
    Object.keys(params).forEach(item => {
      if (typeof (params[item]) === 'object') {
        if (params[item] instanceof Array) {
          // 处理大于0的情况
          if (params[item].length > 0) {
            // 判断第一个元素是基本元素  还是 对象
            if (typeof (params[item][0]) === 'object') {
              for (let i in params[item]) {
                this.parseParams(params[item][i], parentObjectStr + item + '[' + i + ']', resultParams)
              }
            } else {
              // 当为基本元素的时候 将 元素直接放到返回map中
              params[item].forEach(c => {
                if (params[item] != null && params[item] !== undefined && params[item] !== '') {
                  resultParams.append(parentObjectStr + item, c)
                }
              })
            }
          }
        } else {
          // 如果是对象
          this.parseParams(params[item], parentObjectStr + item, resultParams)
        }
      } else {
        // 判断值是否有效
        if (params[item] != null && params[item] !== undefined && params[item] !== '') {
          resultParams.append(parentObjectStr + item, params[item])
        }
      }
    })
    return resultParams
  },
  parseFileForm (data) {
    let newData = new FormData()
    Object.keys(data).forEach(item => {
      if (Object.prototype.toString.call(data[item]) === '[object Array]') {
        data[item].forEach(child => {
          if ((child && child !== null && child !== undefined)) {
            newData.append(item, child)
          }
        })
      } else {
        if (data[item] && data[item] !== null && data[item] !== undefined) {
          newData.append(item, data[item])
        }
      }
    })
    return newData
  }
}
