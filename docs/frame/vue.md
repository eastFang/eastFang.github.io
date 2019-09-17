- 声明周期
  - beforeCreate
  - created
  - beforeMount
  - mounted
  - beforeUpdate
  - updated
  - activated
  - deactivated
  - beforeDestroy
  - destroyed

- 代码风格
  -  简单的计算属性（拆解属性）
  ```javascript
    computed: { // Bad
      price() {
        const basePrice = this.manufactureCost / (1 - this.profitMargin)
        return (
          basePrice -
          basePrice * (this.discountPercent - 0)
        )
      }
    }

    computed: { // good
      basePrice() {
        return this.manufactureCost / (1 - this.profitMargin)
      },
      discount() {
        return this.basePrice * (this.discountPercent || 0)
      },
      finalPrice() {
        return this.basePrice - this.discount
      }
    }
    ```

- 平时业务中不常使用的
  ```javascript
    v-pre
    跳过这个元素和它的子元素的编译过程，用来显示原始标签，会加快编译
  ```