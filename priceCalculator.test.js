const calculatePrice = require('./priceCalculator');

describe('價格計算系統', () => {
  describe('一般會員計算', () => {
    test('無優惠券時，輸入金額等於輸出金額', () => {
      // Arrange
      const memberType = 'regular'; // 一般會員
      const inputAmount = 1000;
      const coupon = null; // 無優惠券

      // Act
      const outputAmount = calculatePrice(memberType, inputAmount, coupon);

      // Assert
      expect(outputAmount).toBe(inputAmount);
    });

    test('無優惠券時，不同金額測試', () => {
      const testCases = [
        { input: 100, expected: 100 },
        { input: 500, expected: 500 },
        { input: 1500, expected: 1500 },
        { input: 10000, expected: 10000 },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = calculatePrice('regular', input, null);
        expect(result).toBe(expected);
      });
    });
  });

  describe('VIP 會員計算', () => {
    test('無優惠券時，輸入金額的 9 折等於輸出金額', () => {
      // Arrange
      const memberType = 'vip'; // VIP 會員
      const inputAmount = 1000;
      const coupon = null; // 無優惠券

      // Act
      const outputAmount = calculatePrice(memberType, inputAmount, coupon);

      // Assert
      expect(outputAmount).toBe(inputAmount * 0.9);
    });

    test('無優惠券時，不同金額的 9 折測試', () => {
      const testCases = [
        { input: 100, expected: 90 },
        { input: 500, expected: 450 },
        { input: 1000, expected: 900 },
        { input: 1500, expected: 1350 },
        { input: 10000, expected: 9000 },
      ];

      testCases.forEach(({ input, expected }) => {
        const result = calculatePrice('vip', input, null);
        expect(result).toBe(expected);
      });
    });
  });

  describe('優惠券限制', () => {
    test('3C 產品不能使用優惠券', () => {
      // Arrange
      const memberType = 'regular';
      const inputAmount = 1000;
      const coupon = { discount: 100 }; // 有優惠券
      const productType = '3C'; // 3C 產品

      // Act & Assert
      expect(() => {
        calculatePrice(memberType, inputAmount, coupon, productType);
      }).toThrow('優惠券不能用於 3C 產品');
    });

    test('非 3C 產品可以使用優惠券', () => {
      // Arrange
      const memberType = 'regular';
      const inputAmount = 1000;
      const coupon = { discount: 100 }; // 100 元折扣券
      const productType = 'clothing'; // 服飾類產品

      // Act
      const outputAmount = calculatePrice(memberType, inputAmount, coupon, productType);

      // Assert
      expect(outputAmount).toBe(900); // 1000 - 100 = 900
    });

    test('VIP 會員的 3C 產品也不能使用優惠券', () => {
      // Arrange
      const memberType = 'vip';
      const inputAmount = 1000;
      const coupon = { discount: 100 };
      const productType = '3C';

      // Act & Assert
      expect(() => {
        calculatePrice(memberType, inputAmount, coupon, productType);
      }).toThrow('優惠券不能用於 3C 產品');
    });
  });
});
