import React from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import ShoppingCart from './components/ECommerce/ShoppingCart'
import ProductList from './components/ECommerce/ProductList'
import Dashboard from './components/Dashboard/Dashboard'
import MultiStepForm from './components/Forms/MultiStepForm'
import UserManagement from './components/Users/UserManagement'
import './App.css'

const routes = [
  { path: '/', name: '首页' },
  { path: '/ecommerce', name: '电商系统' },
  { path: '/dashboard', name: '数据看板' },
  { path: '/forms', name: '表单系统' },
  { path: '/users', name: '用户管理' },
]

function App() {
  const location = useLocation()

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>🧪 Meticulous Demo</h1>
          <p>复杂场景测试演示</p>
        </div>
        <nav className="sidebar-nav">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`nav-link ${location.pathname === route.path ? 'active' : ''}`}
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ecommerce" element={<ECommercePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </main>
    </div>
  )
}

function HomePage() {
  return (
    <div className="page">
      <h2>欢迎使用 Meticulous 测试演示</h2>
      <p>这是一个包含复杂场景的演示应用，用于展示 Meticulous 测试工具的强大功能。</p>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>🛒 电商系统</h3>
          <p>完整的购物流程：浏览商品、添加购物车、结算、订单管理</p>
          <Link to="/ecommerce" className="btn">开始体验</Link>
        </div>

        <div className="feature-card">
          <h3>📊 数据看板</h3>
          <p>实时数据可视化、图表切换、时间范围筛选、数据导出</p>
          <Link to="/dashboard" className="btn">查看数据</Link>
        </div>

        <div className="feature-card">
          <h3>📝 表单系统</h3>
          <p>复杂表单验证、动态字段、文件上传、步骤表单</p>
          <Link to="/forms" className="btn">填写表单</Link>
        </div>

        <div className="feature-card">
          <h3>👥 用户管理</h3>
          <p>用户列表、搜索过滤、角色管理、批量操作</p>
          <Link to="/users" className="btn">管理用户</Link>
        </div>
      </div>
    </div>
  )
}

function ECommercePage() {
  const [cart, setCart] = React.useState<any[]>([])

  const addToCart = (product: any) => {
    setCart([...cart, product])
  }

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index))
  }

  return (
    <div className="page">
      <h2>🛒 电商系统演示</h2>
      <div className="ecommerce-layout">
        <ProductList onAddToCart={addToCart} />
        <ShoppingCart cart={cart} onRemove={removeFromCart} />
      </div>
    </div>
  )
}

function DashboardPage() {
  return (
    <div className="page">
      <Dashboard />
    </div>
  )
}

function FormsPage() {
  return (
    <div className="page">
      <MultiStepForm />
    </div>
  )
}

function UsersPage() {
  return (
    <div className="page">
      <UserManagement />
    </div>
  )
}

export default App
