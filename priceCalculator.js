/**
 * 計算價格
 * @param {string} memberType - 會員類型 ('regular': 一般會員, 'vip': VIP 會員)
 * @param {number} inputAmount - 輸入金額
 * @param {object|null} coupon - 優惠券
 * @returns {number} 計算後的金額
 */
function calculatePrice(memberType, inputAmount, coupon) {
  // 一般會員，無優惠券時，輸入金額等於輸出金額
  if (memberType === 'regular' && !coupon) {
    return inputAmount;
  }

  // VIP 會員，無優惠券時，輸入金額的 9 折等於輸出金額
  if (memberType === 'vip' && !coupon) {
    return inputAmount * 0.9;
  }

  // 未來可擴展其他邏輯
  return inputAmount;
}

module.exports = calculatePrice;
