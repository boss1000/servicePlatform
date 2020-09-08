/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor', 'student']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

// 身份证验证
export function IdCardValidate(idCard) {
  const idCards = trim(idCard.replace(/ /g, ''));
  if (idCard.length === 15) {
    return isValidityBrithBy15IdCard(idCards);
  } else if (idCards.length === 18) {
    const idCardS = idCards.split(''); // 得到身份证数组
    if (isValidityBrithBy18IdCard(idCards) && isTrueValidateCodeBy18IdCard(idCardS)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }

  function isTrueValidateCodeBy18IdCard(aIdCard) {
    const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
    const ValideCode = ['1', '0', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
    let sum = 0;
    const AidCard = aIdCard;
    if (AidCard[17].toLowerCase() === 'x') {
      AidCard[17] = '10';
    }
    for (let i = 0; i < 17; i += 1) {
      sum += Wi[i] * AidCard[i];
    }
    const valCodePosition = sum % 11;
    if (AidCard[17] === ValideCode[valCodePosition]) {
      return true;
    } else {
      return false;
    }
  }

  function isValidityBrithBy18IdCard(idCard18) {
    const year = idCard18.substring(6, 10);
    const month = idCard18.substring(10, 12);
    const day = idCard18.substring(12, 14);
    const tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if (tempDate.getFullYear() !==
      parseFloat(year) ||
      tempDate.getMonth() !==
      parseFloat(month) - 1 ||
      tempDate.getDate() !==
      parseFloat(day)) {
      return false;
    } else {
      return true;
    }
  }

  function isValidityBrithBy15IdCard(idCard15) {
    const year = idCard15.substring(6, 8);
    const month = idCard15.substring(8, 10);
    const day = idCard15.substring(10, 12);
    const tempDate = new Date(year, parseFloat(month) - 1, parseFloat(day));
    if (tempDate.getYear() !==
      parseFloat(year) ||
      tempDate.getMonth() !==
      parseFloat(month) - 1 || tempDate.getDate() !== parseFloat(day)) {
      return false;
    } else {
      return true;
    }
  }

  function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
  }
}
