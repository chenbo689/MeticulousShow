import React, { useState } from 'react'
import { Trash2, Plus, Minus, CreditCard, CheckCircle } from 'lucide-react'
import './ShoppingCart.css'

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface ShoppingCartProps {
  cart: CartItem[]
  onRemove: (index: number) => void
}

export default function ShoppingCart({ cart, onRemove }: ShoppingCartProps) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'credit'
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cart]
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta)
    // 需要通过回调更新父组件的 cart
    // 这里简化处理
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 99
  const total = subtotal + shipping

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    setOrderPlaced(true)
    setTimeout(() => {
      setShowCheckout(false)
      setOrderPlaced(false)
      setFormData({ name: '', email: '', address: '', paymentMethod: 'credit' })
    }, 3000)
  }

  if (orderPlaced) {
    return (
      <div className="shopping-cart">
        <div className="order-success">
          <CheckCircle size={64} className="success-icon" />
          <h3>订单提交成功！</h3>
          <p>感谢您的购买，订单正在处理中</p>
          <button className="btn" onClick={() => setOrderPlaced(false)}>
            继续购物
          </button>
        </div>
      </div>
    )
  }

  if (showCheckout) {
    return (
      <div className="shopping-cart">
        <div className="checkout-form">
          <h3>结算</h3>
          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label>姓名</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="请输入您的姓名"
              />
            </div>

            <div className="form-group">
              <label>邮箱</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="请输入邮箱地址"
              />
            </div>

            <div className="form-group">
              <label>收货地址</label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="请输入详细收货地址"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>支付方式</label>
              <div className="payment-methods">
                <label className="payment-method">
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  />
                  <CreditCard size={16} />
                  信用卡
                </label>
                <label className="payment-method">
                  <input
                    type="radio"
                    name="payment"
                    value="alipay"
                    checked={formData.paymentMethod === 'alipay'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  />
                  支付宝
                </label>
                <label className="payment-method">
                  <input
                    type="radio"
                    name="payment"
                    value="wechat"
                    checked={formData.paymentMethod === 'wechat'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  />
                  微信支付
                </label>
              </div>
            </div>

            <div className="order-summary">
              <div className="summary-row">
                <span>商品小计</span>
                <span>¥{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>运费</span>
                <span>{shipping === 0 ? '免运费' : `¥${shipping}`}</span>
              </div>
              <div className="summary-row total">
                <span>总计</span>
                <span>¥{total}</span>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowCheckout(false)}
              >
                返回购物车
              </button>
              <button type="submit" className="btn btn-primary">
                提交订单
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="shopping-cart">
      <h3>购物车 ({cart.length}件)</h3>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>购物车是空的</p>
          <span>快去添加商品吧！</span>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-image">{item.image}</div>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-price">¥{item.price}</p>
                  <div className="item-quantity">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(index, -1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(index, 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="item-actions">
                  <p className="item-total">¥{item.price * item.quantity}</p>
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>小计</span>
              <span>¥{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>运费</span>
              <span>{shipping === 0 ? '免运费' : `¥${shipping}`}</span>
            </div>
            <div className="summary-row total">
              <span>总计</span>
              <span>¥{total}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => setShowCheckout(true)}
            >
              <CreditCard size={18} />
              去结算
            </button>
          </div>
        </>
      )}
    </div>
  )
}
