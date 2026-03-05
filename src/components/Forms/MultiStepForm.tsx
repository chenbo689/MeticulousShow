import React, { useState } from 'react'
import { Check, X, Upload, FileText, Calendar, User, Mail, Phone } from 'lucide-react'
import './MultiStepForm.css'

type Step = 1 | 2 | 3 | 4

interface FormData {
  // Step 1: Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string

  // Step 2: Company Info
  companyName: string
  position: string
  companySize: string
  industry: string

  // Step 3: Additional Info
  startDate: string
  description: string
  interests: string[]
  uploadedFiles: File[]
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    position: '',
    companySize: '',
    industry: '',
    startDate: '',
    description: '',
    interests: [],
    uploadedFiles: []
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const interests = ['产品管理', '技术开发', '市场营销', '数据分析', '用户体验', '项目管理']

  const validateStep = (step: Step): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = '请输入姓氏'
      if (!formData.lastName) newErrors.lastName = '请输入名字'
      if (!formData.email) newErrors.email = '请输入邮箱'
      if (!formData.phone) newErrors.phone = '请输入电话'
      else if (!/^1[3-9]\d{9}$/.test(formData.phone)) newErrors.phone = '请输入有效的手机号'
    }

    if (step === 2) {
      if (!formData.companyName) newErrors.companyName = '请输入公司名称'
      if (!formData.position) newErrors.position = '请输入职位'
      if (!formData.companySize) newErrors.companySize = '请选择公司规模'
      if (!formData.industry) newErrors.industry = '请选择行业'
    }

    if (step === 3) {
      if (!formData.startDate) newErrors.startDate = '请选择开始日期'
      if (formData.interests.length === 0) newErrors.interests = '请至少选择一个兴趣'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4) as Step)
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as Step)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
    if (errors.interests) {
      setErrors(prev => ({ ...prev, interests: '' }))
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files]
    }))
  }

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = () => {
    if (validateStep(3)) {
      setSubmitted(true)
      console.log('Form submitted:', formData)
      setTimeout(() => {
        setSubmitted(false)
        setCurrentStep(1)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          position: '',
          companySize: '',
          industry: '',
          startDate: '',
          description: '',
          interests: [],
          uploadedFiles: []
        })
      }, 3000)
    }
  }

  if (submitted) {
    return (
      <div className="multi-step-form">
        <div className="success-message">
          <Check size={64} className="success-icon" />
          <h2>提交成功！</h2>
          <p>感谢您的提交，我们会尽快与您联系。</p>
          <button className="btn" onClick={() => setSubmitted(false)}>
            继续填写
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="multi-step-form">
      <h2>📝 多步骤表单演示</h2>
      <p>展示复杂表单验证、动态字段和文件上传功能</p>

      <div className="steps-indicator">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <div className={`step ${currentStep >= step ? 'active' : ''}`}>
              <div className="step-number">{currentStep > step ? <Check size={16} /> : step}</div>
              <div className="step-label">
                {step === 1 && '个人信息'}
                {step === 2 && '公司信息'}
                {step === 3 && '其他信息'}
                {step === 4 && '确认'}
              </div>
            </div>
            {step < 4 && <div className={`step-line ${currentStep > step ? 'active' : ''}`}></div>}
          </React.Fragment>
        ))}
      </div>

      <div className="form-content">
        {currentStep === 1 && (
          <div className="step-content">
            <h3>个人信息</h3>
            <div className="form-grid">
              <div className="form-group">
                <label><User size={16} /> 姓氏 *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="请输入姓氏"
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label><User size={16} /> 名字 *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="请输入名字"
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label><Mail size={16} /> 邮箱 *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="请输入邮箱"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label><Phone size={16} /> 电话 *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="请输入电话"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-content">
            <h3>公司信息</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>公司名称 *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="请输入公司名称"
                  className={errors.companyName ? 'error' : ''}
                />
                {errors.companyName && <span className="error-message">{errors.companyName}</span>}
              </div>

              <div className="form-group">
                <label>职位 *</label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="请输入职位"
                  className={errors.position ? 'error' : ''}
                />
                {errors.position && <span className="error-message">{errors.position}</span>}
              </div>

              <div className="form-group">
                <label>公司规模 *</label>
                <select
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className={errors.companySize ? 'error' : ''}
                >
                  <option value="">请选择</option>
                  <option value="1-10">1-10 人</option>
                  <option value="11-50">11-50 人</option>
                  <option value="51-200">51-200 人</option>
                  <option value="201-500">201-500 人</option>
                  <option value="500+">500+ 人</option>
                </select>
                {errors.companySize && <span className="error-message">{errors.companySize}</span>}
              </div>

              <div className="form-group full-width">
                <label>行业 *</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className={errors.industry ? 'error' : ''}
                >
                  <option value="">请选择行业</option>
                  <option value="tech">科技/互联网</option>
                  <option value="finance">金融</option>
                  <option value="education">教育</option>
                  <option value="healthcare">医疗健康</option>
                  <option value="retail">零售/电商</option>
                  <option value="other">其他</option>
                </select>
                {errors.industry && <span className="error-message">{errors.industry}</span>}
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-content">
            <h3>其他信息</h3>
            <div className="form-grid">
              <div className="form-group">
                <label><Calendar size={16} /> 开始日期 *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={errors.startDate ? 'error' : ''}
                />
                {errors.startDate && <span className="error-message">{errors.startDate}</span>}
              </div>

              <div className="form-group full-width">
                <label>兴趣领域 (至少选择一项) *</label>
                <div className="checkbox-group">
                  {interests.map(interest => (
                    <label key={interest} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                      />
                      <span>{interest}</span>
                    </label>
                  ))}
                </div>
                {errors.interests && <span className="error-message">{errors.interests}</span>}
              </div>

              <div className="form-group full-width">
                <label>详细描述</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="请输入详细描述..."
                  rows={4}
                />
              </div>

              <div className="form-group full-width">
                <label><Upload size={16} /> 文件上传</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  <label htmlFor="file-upload" className="upload-btn">
                    <Upload size={20} />
                    选择文件
                  </label>
                </div>

                {formData.uploadedFiles.length > 0 && (
                  <div className="file-list">
                    {formData.uploadedFiles.map((file, index) => (
                      <div key={index} className="file-item">
                        <FileText size={16} />
                        <span>{file.name}</span>
                        <button onClick={() => handleRemoveFile(index)} className="remove-file">
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="step-content">
            <h3>确认信息</h3>
            <div className="summary">
              <div className="summary-section">
                <h4>个人信息</h4>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span>姓名</span>
                    <strong>{formData.lastName} {formData.firstName}</strong>
                  </div>
                  <div className="summary-item">
                    <span>邮箱</span>
                    <strong>{formData.email}</strong>
                  </div>
                  <div className="summary-item">
                    <span>电话</span>
                    <strong>{formData.phone}</strong>
                  </div>
                </div>
              </div>

              <div className="summary-section">
                <h4>公司信息</h4>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span>公司名称</span>
                    <strong>{formData.companyName}</strong>
                  </div>
                  <div className="summary-item">
                    <span>职位</span>
                    <strong>{formData.position}</strong>
                  </div>
                  <div className="summary-item">
                    <span>公司规模</span>
                    <strong>{formData.companySize} 人</strong>
                  </div>
                  <div className="summary-item">
                    <span>行业</span>
                    <strong>{formData.industry}</strong>
                  </div>
                </div>
              </div>

              <div className="summary-section">
                <h4>其他信息</h4>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span>开始日期</span>
                    <strong>{formData.startDate}</strong>
                  </div>
                  <div className="summary-item">
                    <span>兴趣领域</span>
                    <strong>{formData.interests.join(', ')}</strong>
                  </div>
                  {formData.description && (
                    <div className="summary-item full-width">
                      <span>详细描述</span>
                      <strong>{formData.description}</strong>
                    </div>
                  )}
                  {formData.uploadedFiles.length > 0 && (
                    <div className="summary-item full-width">
                      <span>上传文件</span>
                      <strong>{formData.uploadedFiles.map(f => f.name).join(', ')}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="form-actions">
        {currentStep > 1 && (
          <button className="btn btn-secondary" onClick={handlePrevious}>
            上一步
          </button>
        )}
        {currentStep < 4 && (
          <button className="btn btn-primary" onClick={handleNext}>
            下一步
          </button>
        )}
        {currentStep === 4 && (
          <button className="btn btn-primary" onClick={handleSubmit}>
            提交
          </button>
        )}
      </div>
    </div>
  )
}
