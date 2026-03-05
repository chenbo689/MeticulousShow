import React, { useState } from 'react'
import { ShoppingCart, Star, Search } from 'lucide-react'
import './ProductList.css'

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  category: string
}

const products: Product[] = [
  { id: 1, name: '无线降噪耳机', price: 899, image: '🎧', rating: 4.8, reviews: 2341, category: '电子' },
  { id: 2, name: '智能手表 Pro', price: 1299, image: '⌚', rating: 4.7, reviews: 1892, category: '电子' },
  { id: 3, name: '机械键盘 RGB', price: 459, image: '⌨️', rating: 4.9, reviews: 3456, category: '电子' },
  { id: 4, name: '人体工学椅', price: 1599, image: '🪑', rating: 4.6, reviews: 987, category: '家具' },
  { id: 5, name: '4K 显示器 27寸', price: 2199, image: '🖥️', rating: 4.8, reviews: 1543, category: '电子' },
  { id: 6, name: '便携式蓝牙音箱', price: 399, image: '🔊', rating: 4.5, reviews: 2156, category: '电子' },
]

interface ProductListProps {
  onAddToCart: (product: Product) => void
}

export default function ProductList({ onAddToCart }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [sortBy, setSortBy] = useState('default')

  const categories = ['全部', '电子', '家具']

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === '全部' || p.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h3>商品列表</h3>
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="搜索商品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="filters">
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category}
              className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">默认排序</option>
          <option value="price-asc">价格从低到高</option>
          <option value="price-desc">价格从高到低</option>
          <option value="rating">评分最高</option>
        </select>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <div className="product-info">
              <h4>{product.name}</h4>
              <div className="product-meta">
                <span className="category-tag">{product.category}</span>
                <div className="rating">
                  <Star size={14} fill="currentColor" />
                  <span>{product.rating}</span>
                  <span className="reviews">({product.reviews} 评价)</span>
                </div>
              </div>
              <div className="product-price-actions">
                <span className="price">¥{product.price}</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(product)}
                >
                  <ShoppingCart size={18} />
                  加入购物车
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p>没有找到匹配的商品</p>
        </div>
      )}
    </div>
  )
}
