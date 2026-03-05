import React, { useState } from 'react'
import { Search, Filter, MoreVertical, Edit, Trash2, Check, X, Plus, Shield, User as UserIcon, Mail, MapPin } from 'lucide-react'
import './UserManagement.css'

interface User {
  id: number
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'inactive' | 'pending'
  location: string
  lastLogin: string
  avatar: string
}

interface UserFormData {
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  status: 'active' | 'inactive'
  location: string
}

const roles = [
  { value: 'admin', label: '管理员', color: '#f44336' },
  { value: 'editor', label: '编辑', color: '#ff9800' },
  { value: 'viewer', label: '查看者', color: '#4caf50' }
]

const statuses = [
  { value: 'active', label: '活跃', color: '#4caf50' },
  { value: 'inactive', label: '未激活', color: '#999' },
  { value: 'pending', label: '待审核', color: '#ff9800' }
]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin', status: 'active', location: '北京', lastLogin: '2024-01-15', avatar: '👨' },
    { id: 2, name: '李四', email: 'lisi@example.com', role: 'editor', status: 'active', location: '上海', lastLogin: '2024-01-14', avatar: '👩' },
    { id: 3, name: '王五', email: 'wangwu@example.com', role: 'viewer', status: 'inactive', location: '广州', lastLogin: '2024-01-10', avatar: '👨' },
    { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: 'editor', status: 'pending', location: '深圳', lastLogin: '2024-01-12', avatar: '👩' },
    { id: 5, name: '钱七', email: 'qianqi@example.com', role: 'viewer', status: 'active', location: '杭州', lastLogin: '2024-01-13', avatar: '👨' }
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null)
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'viewer',
    status: 'active',
    location: ''
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = selectedRole === 'all' || user.role === selectedRole
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleAddUser = () => {
    setFormData({ name: '', email: '', role: 'viewer', status: 'active', location: '' })
    setShowAddModal(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status === 'pending' ? 'active' : user.status,
      location: user.location
    })
    setShowEditModal(true)
  }

  const handleDeleteUser = (userId: number) => {
    setDeleteTargetId(userId)
    setShowDeleteConfirm(true)
  }

  const handleBatchDelete = () => {
    setUsers(users.filter(user => !selectedUsers.includes(user.id)))
    setSelectedUsers([])
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedUsers(checked ? filteredUsers.map(user => user.id) : [])
  }

  const handleSelectUser = (userId: number, checked: boolean) => {
    setSelectedUsers(prev =>
      checked ? [...prev, userId] : prev.filter(id => id !== userId)
    )
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (showAddModal) {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        status: formData.status as User['status'],
        lastLogin: '从未登录',
        avatar: Math.random() > 0.5 ? '👨' : '👩'
      }
      setUsers([...users, newUser])
    } else if (showEditModal && editingUser) {
      setUsers(users.map(user =>
        user.id === editingUser.id
          ? { ...user, ...formData, status: formData.status as User['status'] }
          : user
      ))
    }

    setShowAddModal(false)
    setShowEditModal(false)
    setEditingUser(null)
  }

  const confirmDelete = () => {
    if (deleteTargetId) {
      setUsers(users.filter(user => user.id !== deleteTargetId))
    }
    setShowDeleteConfirm(false)
    setDeleteTargetId(null)
  }

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
  }

  return (
    <div className="user-management">
      <div className="page-header">
        <div>
          <h2>👥 用户管理</h2>
          <p>管理系统用户、角色和权限</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddUser}>
          <Plus size={20} />
          添加用户
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="搜索用户..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <Filter size={18} />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">所有角色</option>
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">所有状态</option>
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
        </div>

        {selectedUsers.length > 0 && (
          <button
            className="btn btn-danger"
            onClick={handleBatchDelete}
          >
            <Trash2 size={18} />
            批量删除 ({selectedUsers.length})
          </button>
        )}
      </div>

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th>用户</th>
              <th>角色</th>
              <th>状态</th>
              <th>位置</th>
              <th>最后登录</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => {
              const roleInfo = roles.find(r => r.value === user.role)
              const statusInfo = statuses.find(s => s.value === user.status)

              return (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                    />
                  </td>
                  <td>
                    <div className="user-info">
                      <span className="user-avatar">{user.avatar}</span>
                      <div>
                        <p className="user-name">{user.name}</p>
                        <p className="user-email">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="role-badge"
                      style={{ background: `${roleInfo?.color}20`, color: roleInfo?.color }}
                    >
                      <Shield size={14} />
                      {roleInfo?.label}
                    </span>
                  </td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ background: `${statusInfo?.color}20`, color: statusInfo?.color }}
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.status === 'active' && <Check size={14} />}
                      {user.status === 'inactive' && <X size={14} />}
                      {user.status === 'pending' && '⏳'}
                      {statusInfo?.label}
                    </span>
                  </td>
                  <td>
                    <div className="location">
                      <MapPin size={14} />
                      {user.location}
                    </div>
                  </td>
                  <td>{user.lastLogin}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn"
                        onClick={() => handleEditUser(user)}
                        title="编辑"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => handleDeleteUser(user.id)}
                        title="删除"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="empty-state">
            <UserIcon size={48} />
            <p>没有找到用户</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>添加用户</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="user-form">
              <div className="form-group">
                <label><UserIcon size={18} /> 姓名</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="请输入姓名"
                />
              </div>

              <div className="form-group">
                <label><Mail size={18} /> 邮箱</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="请输入邮箱"
                />
              </div>

              <div className="form-group">
                <label><Shield size={18} /> 角色</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label><MapPin size={18} /> 位置</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="请输入位置"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  取消
                </button>
                <button type="submit" className="btn btn-primary">
                  添加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editingUser && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>编辑用户</h3>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="user-form">
              <div className="form-group">
                <label><UserIcon size={18} /> 姓名</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label><Mail size={18} /> 邮箱</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label><Shield size={18} /> 角色</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>{role.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>状态</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                >
                  {statuses.filter(s => s.value !== 'pending').map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label><MapPin size={18} /> 位置</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                  取消
                </button>
                <button type="submit" className="btn btn-primary">
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>确认删除</h3>
              <button className="close-btn" onClick={() => setShowDeleteConfirm(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <p>确定要删除这个用户吗？此操作无法撤销。</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                取消
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
