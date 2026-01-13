/**
 * 計算價格
 * @param {string} memberType - 會員類型 ('regular': 一般會員, 'vip': VIP 會員)
 * @param {number} inputAmount - 輸入金額
 * @param {object|null} coupon - 優惠券 ({ discount: number })
 * @param {string} productType - 產品類型 (可選)
 * @returns {number} 計算後的金額
 */
function calculatePrice(memberType, inputAmount, coupon, productType) {
  // 優惠券限制：3C 產品不能使用優惠券
  if (coupon && productType === '3C') {
    throw new Error('優惠券不能用於 3C 產品');
  }

  // 一般會員，無優惠券時，輸入金額等於輸出金額
  if (memberType === 'regular' && !coupon) {
    return inputAmount;
  }

  // VIP 會員，無優惠券時，輸入金額的 9 折等於輸出金額
  if (memberType === 'vip' && !coupon) {
    return inputAmount * 0.9;
  }

  // 有優惠券時，扣除優惠券折扣
  if (coupon && coupon.discount) {
    return inputAmount - coupon.discount;
  }

  // 未來可擴展其他邏輯
  return inputAmount;
}

module.exports = calculatePrice;
