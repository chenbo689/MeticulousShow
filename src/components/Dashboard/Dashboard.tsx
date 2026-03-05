import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Users, DollarSign, Calendar, Download, RefreshCw } from 'lucide-react'
import './Dashboard.css'

interface StatCard {
  title: string
  value: string
  change: string
  positive: boolean
  icon: React.ReactNode
}

interface ChartData {
  month: string
  sales: number
  visits: number
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')
  const [refreshing, setRefreshing] = useState(false)
  const [activeChart, setActiveChart] = useState<'sales' | 'visits'>('sales')

  const stats: StatCard[] = [
    {
      title: '总销售额',
      value: '¥128,456',
      change: '+12.5%',
      positive: true,
      icon: <DollarSign size={24} />
    },
    {
      title: '访问量',
      value: '45,678',
      change: '+8.2%',
      positive: true,
      icon: <TrendingUp size={24} />
    },
    {
      title: '用户数',
      value: '12,345',
      change: '-2.1%',
      positive: false,
      icon: <Users size={24} />
    },
    {
      title: '订单数',
      value: '3,456',
      change: '+15.3%',
      positive: true,
      icon: <BarChart3 size={24} />
    }
  ]

  const chartData: Record<string, ChartData[]> = {
    sales: [
      { month: '1月', sales: 12000, visits: 45000 },
      { month: '2月', sales: 19000, visits: 52000 },
      { month: '3月', sales: 15000, visits: 48000 },
      { month: '4月', sales: 22000, visits: 61000 },
      { month: '5月', sales: 28000, visits: 72000 },
      { month: '6月', sales: 32000, visits: 85000 }
    ],
    visits: [
      { month: '1月', sales: 12000, visits: 45000 },
      { month: '2月', sales: 19000, visits: 52000 },
      { month: '3月', sales: 15000, visits: 48000 },
      { month: '4月', sales: 22000, visits: 61000 },
      { month: '5月', sales: 28000, visits: 72000 },
      { month: '6月', sales: 32000, visits: 85000 }
    ]
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  const handleExport = () => {
    alert('数据导出成功！')
  }

  const maxValue = Math.max(...chartData[activeChart].map(d => d[activeChart === 'sales' ? 'sales' : 'visits']))

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>📊 数据看板</h2>
          <p>实时监控业务数据和关键指标</p>
        </div>
        <div className="dashboard-actions">
          <button
            className={`time-range-btn ${timeRange === '7d' ? 'active' : ''}`}
            onClick={() => setTimeRange('7d')}
          >
            7天
          </button>
          <button
            className={`time-range-btn ${timeRange === '30d' ? 'active' : ''}`}
            onClick={() => setTimeRange('30d')}
          >
            30天
          </button>
          <button
            className={`time-range-btn ${timeRange === '90d' ? 'active' : ''}`}
            onClick={() => setTimeRange('90d')}
          >
            90天
          </button>
          <button
            className={`icon-btn ${refreshing ? 'refreshing' : ''}`}
            onClick={handleRefresh}
          >
            <RefreshCw size={20} />
          </button>
          <button className="icon-btn" onClick={handleExport}>
            <Download size={20} />
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-title">{stat.title}</p>
              <p className="stat-value">{stat.value}</p>
              <p className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                {stat.positive ? '↑' : '↓'} {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3>趋势分析</h3>
            <div className="chart-tabs">
              <button
                className={`chart-tab ${activeChart === 'sales' ? 'active' : ''}`}
                onClick={() => setActiveChart('sales')}
              >
                销售额
              </button>
              <button
                className={`chart-tab ${activeChart === 'visits' ? 'active' : ''}`}
                onClick={() => setActiveChart('visits')}
              >
                访问量
              </button>
            </div>
          </div>
          <div className="chart-container">
            <svg viewBox="0 0 600 300" className="chart">
              {chartData[activeChart].map((d, i) => {
                const x = 50 + (i * 100)
                const value = activeChart === 'sales' ? d.sales : d.visits
                const height = (value / maxValue) * 200
                const y = 250 - height

                return (
                  <g key={d.month}>
                    <line
                      x1={x}
                      y1={y}
                      x2={x}
                      y2={250}
                      stroke="#e0e0e0"
                      strokeWidth="1"
                    />
                    <rect
                      x={x - 30}
                      y={y}
                      width="60"
                      height={height}
                      fill="url(#barGradient)"
                      rx="4"
                      className="chart-bar"
                    >
                      <title>{d.month}: {value.toLocaleString()}</title>
                    </rect>
                    <text
                      x={x}
                      y={270}
                      textAnchor="middle"
                      fill="#666"
                      fontSize="12"
                    >
                      {d.month}
                    </text>
                    <text
                      x={x}
                      y={y - 10}
                      textAnchor="middle"
                      fill="#333"
                      fontSize="11"
                      fontWeight="bold"
                    >
                      {(value / 1000).toFixed(1)}k
                    </text>
                  </g>
                )
              })}
              <defs>
                <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>数据分布</h3>
            <Calendar size={20} className="calendar-icon" />
          </div>
          <div className="pie-chart">
            {[
              { label: '电子产品', value: 45, color: '#667eea' },
              { label: '服装', value: 25, color: '#764ba2' },
              { label: '家居', value: 20, color: '#f093fb' },
              { label: '其他', value: 10, color: '#f5576c' }
            ].map((item, index, array) => {
              const cumulativePercent = array.slice(0, index).reduce((sum, i) => sum + i.value, 0)
              const startAngle = (cumulativePercent / 100) * 360 - 90
              const endAngle = ((cumulativePercent + item.value) / 100) * 360 - 90

              const startRad = (startAngle * Math.PI) / 180
              const endRad = (endAngle * Math.PI) / 180

              const x1 = 125 + 100 * Math.cos(startRad)
              const y1 = 125 + 100 * Math.sin(startRad)
              const x2 = 125 + 100 * Math.cos(endRad)
              const y2 = 125 + 100 * Math.sin(endRad)

              const largeArc = item.value > 50 ? 1 : 0

              return (
                <g key={item.label}>
                  <path
                    d={`M 125 125 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={item.color}
                    className="pie-slice"
                  >
                    <title>{item.label}: {item.value}%</title>
                  </path>
                </g>
              )
            })}
            <text x="125" y="130" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">
              总计
            </text>
          </div>
          <div className="pie-legend">
            {[
              { label: '电子产品', value: 45, color: '#667eea' },
              { label: '服装', value: 25, color: '#764ba2' },
              { label: '家居', value: 20, color: '#f093fb' },
              { label: '其他', value: 10, color: '#f5576c' }
            ].map(item => (
              <div key={item.label} className="legend-item">
                <div className="legend-color" style={{ background: item.color }}></div>
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>最近活动</h3>
        <div className="activity-list">
          {[
            { user: '张三', action: '下单', time: '5分钟前', status: 'success' },
            { user: '李四', action: '注册', time: '15分钟前', status: 'success' },
            { user: '王五', action: '退款', time: '30分钟前', status: 'warning' },
            { user: '赵六', action: '下单', time: '1小时前', status: 'success' },
            { user: '钱七', action: '提交评价', time: '2小时前', status: 'success' }
          ].map((activity, index) => (
            <div key={index} className="activity-item">
              <div className={`activity-dot activity-${activity.status}`}></div>
              <div className="activity-content">
                <p>{activity.user} {activity.action}</p>
                <span>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
