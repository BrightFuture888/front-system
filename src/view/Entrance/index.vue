<template>
  <div class="entrance-container">
    <!-- 欢迎头部区域 -->
    <div class="welcome-section">
      <div class="welcome-content">
        <div class="welcome-badge">
          <a-tag color="#1890ff" class="badge-tag">微前端管理系统</a-tag>
        </div>
        <h1 class="welcome-title">欢迎进入系统</h1>
        <p class="welcome-description">
         基于 Qiankun + Vue 3 + Vite 构建的现代化微前端架构平台<br />
          为您提供高效、稳定、可扩展的前端解决方案
        </p>
        <div class="welcome-actions">
          <a-button type="primary" size="large" class="primary-btn" @click="goToApp('application-1')">
            开始体验
          </a-button>
          <a-button size="large" class="secondary-btn" @click="showGuide">
            查看指南
          </a-button>
        </div>
      </div>
      <div class="welcome-illustration">
        <div class="illustration-container">
          <svg width="320" height="240" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
           <rect x="20" y="20" width="280" height="200" rx="12" fill="#1890ff" fill-opacity="0.1" />
            <rect x="40" y="40" width="60" height="60" rx="8" fill="#1890ff" fill-opacity="0.2" />
            <rect x="120" y="40" width="60" height="60" rx="8" fill="#52c41a" fill-opacity="0.2" />
            <rect x="200" y="40" width="60" height="60" rx="8" fill="#fa8c16" fill-opacity="0.2" />
            <rect x="80" y="120" width="160" height="60" rx="8" fill="#722ed1" fill-opacity="0.2" />
            <circle cx="60" cy="60" r="8" fill="#1890ff" />
            <circle cx="140" cy="60" r="8" fill="#52c41a" />
            <circle cx="220" cy="60" r="8" fill="#fa8c16" />
            <circle cx="160" cy="140" r="8" fill="#722ed1" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 系统概览卡片 -->
    <a-card class="system-overview-card" :bordered="false">
      <template #title>
        <span class="card-title">系统概览</span>
      </template>
      <template #extra>
        <a-tag color="success" class="status-tag">运行正常</a-tag>
      </template>

      <a-row :gutter="[24, 24]" class="overview-stats">
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <div class="stat-item">
            <div class="stat-icon" style="background-color: #1890ff;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">3</div>
              <div class="stat-label">微应用</div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <div class="stat-item">
            <div class="stat-icon" style="background-color: #52c41a;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" stroke-width="2"
                  stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="9" cy="7" r="4" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">128</div>
              <div class="stat-label">在线用户</div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <div class="stat-item">
            <div class="stat-icon" style="background-color: #fa8c16;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <polyline points="12,6 12,12 16,14" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">v2.0.0</div>
              <div class="stat-label">系统版本</div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :md="8" :lg="6">
          <div class="stat-item">
            <div class="stat-icon" style="background-color: #722ed1;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                  stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <line x1="12" y1="22.08" x2="12" y2="12" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </div>
            <div class="stat-content">
              <div class="stat-value">99.9%</div>
              <div class="stat-label">可用性</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <!-- 核心功能区域 -->
    <div class="features-section">
      <div class="section-header">
        <h2 class="section-title">核心功能特性</h2>
        <p class="section-subtitle">为您的业务提供强大的技术支撑</p>
      </div>

      <a-row :gutter="[24, 24]" class="features-grid">
        <a-col :xs="24" :sm="12" :lg="8" v-for="(feature, index) in features" :key="index">
         <a-card class="feature-card" hoverable :class="`feature-card-${index}`" @mouseenter="onFeatureHover(index)"
            @mouseleave="onFeatureLeave(index)">
            <div class="feature-header">
              <div class="feature-icon" :style="{ backgroundColor: feature.color }">
                <component :is="feature.icon" />
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
            </div>
            <p class="feature-description">{{ feature.description }}</p>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 快速操作区域 -->
    <div class="quick-actions-section">
      <div class="section-header">
        <h2 class="section-title">快速开始</h2>
        <p class="section-subtitle">选择您要访问的应用</p>
      </div>

      <div class="actions-container">
        <a-space size="middle" wrap>
         <a-button v-for="value in applicationList" type="primary" size="large" class="action-btn"
            @click="() => { goToApp(value.name) }">
            <template #icon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </template>
           {{ value.meta.title }}
          </a-button>
        </a-space>
      </div>
    </div>

    <!-- 页脚 -->
    <div class="footer-section">
      <p class="footer-text">© 2026 微前端管理系统 | 基于 Qiankun + Vue 3 + TypeScript</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { accessRoutes } from "@/router/access";


const router = useRouter()

const applicationList = accessRoutes

// 功能特性数据
const features = [
  {
    title: '微前端架构',
    description: '支持独立部署、独立开发的微应用体系，提升团队协作效率',
    color: '#1890ff',
    icon: 'MicroFrontendIcon'
  },
  {
    title: '实时监控',
    description: '系统状态实时监控与告警，确保服务稳定可靠运行',
    color: '#52c41a',
    icon: 'MonitorIcon'
  },
  {
    title: '权限管理',
    description: '精细化的权限控制与角色管理，保障系统安全',
    color: '#fa8c16',
    icon: 'PermissionIcon'
  },
  {
    title: '高性能',
    description: '基于 Vite 的极速构建和热更新，提升开发体验',
    color: '#722ed1',
    icon: 'PerformanceIcon'
  },
  {
    title: 'TypeScript',
    description: '完整的类型安全支持，减少运行时错误',
    color: '#2f54eb',
    icon: 'TypescriptIcon'
  },
  {
    title: '响应式设计',
    description: '适配各种设备屏幕，提供一致的用户体验',
    color: '#eb2f96',
    icon: 'ResponsiveIcon'
  }
]


const goToApp = (name: string) => {
  router.push({
    name
  })
}

const showGuide = () => {
  // 显示使用指南
  console.log('显示使用指南')
}

const onFeatureHover = (index: number) => {
  // 卡片悬停效果（可扩展）
}

const onFeatureLeave = (index: number) => {
  // 卡片离开效果（可扩展）
}
</script>

<style scoped>
.entrance-container {
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf9 100%);
}

/* 欢迎区域 */
.welcome-section {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  margin-bottom: 48px;
  align-items: center;
}

.welcome-content {
  flex: 1;
  min-width: 300px;
}

.welcome-badge {
  margin-bottom: 16px;
}

.badge-tag {
  font-weight: 600;
  padding: 4px 12px;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1890ff;
  margin: 0 0 16px 0;
  line-height: 1.2;
}

.welcome-description {
  font-size: 1.125rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 32px;
}

.welcome-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.primary-btn {
  background: linear-gradient(135deg, #1890ff 0%, #40a9ff 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
  transition: all 0.3s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(24, 144, 255, 0.4);
}

.secondary-btn {
  border-color: #1890ff;
  color: #1890ff;
  transition: all 0.3s ease;
}

.secondary-btn:hover {
  background: #1890ff;
  color: white;
}

.welcome-illustration {
  flex: 0 0 320px;
  display: flex;
  justify-content: center;
}

.illustration-container {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }
}

/* 系统概览卡片 */
.system-overview-card {
  margin-bottom: 48px;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.status-tag {
  font-weight: 600;
}

.overview-stats {
  margin-top: 24px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  line-height: 1.2;
}

.stat-label {
  font-size: 0.875rem;
  color: #8c8c8c;
  margin-top: 4px;
}

/* 功能特性区域 */
.features-section {
  margin-bottom: 48px;
}

.section-header {
  text-align: center;
  margin-bottom: 32px;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 12px 0;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #666;
  margin: 0;
}

.features-grid {
  --ant-card-head-height: 0px;
}

.feature-card {
  height: 100%;
  border-radius: 16px;
  transition: all 0.3s ease;
  border: 1px solid #e8e8e8;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: #1890ff;
}

.feature-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.feature-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 快速操作区域 */
.quick-actions-section {
  margin-bottom: 48px;
}

.actions-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(24, 144, 255, 0.3);
}

/* 页脚 */
.footer-section {
  text-align: center;
}

.footer-text {
  color: #8c8c8c;
  font-size: 0.95rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 2rem;
  }

  .welcome-description {
    font-size: 1rem;
  }

  .stat-item {
    padding: 12px;
  }

  .stat-value {
    font-size: 1.25rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .welcome-actions {
    justify-content: center;
  }
}

/* 自定义图标组件 */
.MicroFrontendIcon,
.MonitorIcon,
.PermissionIcon,
.PerformanceIcon,
.TypescriptIcon,
.ResponsiveIcon {
  width: 24px;
  height: 24px;
  color: white;
}
</style>