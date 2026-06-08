<template>
  <div class="net-asset-value-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1 class="page-title">基金净值查询</h1>
      <p class="page-subtitle">输入基金代码查询实时净值信息，或管理您的关注基金</p>
    </div>

    <!-- 搜索和关注区域 -->
    <div class="search-section">
      <div class="search-container">
        <a-input-search v-model:value="searchQuery" placeholder="请输入基金代码（如：003096）" class="search-input"
          @search="handleSearch" allowClear :loading="loading" />
        <a-button type="primary" @click="handleSearch" :loading="loading" class="search-button">
          查询
        </a-button>
        <a-button type="default" @click="addToFavorites" :disabled="!searchQuery.trim() || isFavorite(searchQuery)"
          class="favorite-button">
          {{ isFavorite(searchQuery) ? '已关注' : '添加关注' }}
        </a-button>
      </div>
    </div>

    <!-- 关注基金列表 -->
    <div v-if="favoriteFunds.length > 0" class="favorites-section">
      <div class="favorites-header">
        <h2 class="favorites-title">我的关注基金 ({{ favoriteFunds.length }})</h2>
        <a-button type="link" @click="clearAllFavorites" size="small">
          清空所有
        </a-button>
      </div>

      <!-- 批量查询按钮 -->
      <div class="batch-actions">
        <a-button type="primary" @click="fetchAllFavorites" :loading="batchLoading" class="batch-query-button">
          一键查询所有关注基金
        </a-button>
      </div>

      <!-- 关注基金详情列表 -->
      <div class="favorites-grid">
        <div v-for="fund in favoriteFundData" :key="fund.code" class="fund-detail-card favorites-card">
          <div class="fund-header">
            <div class="fund-basic-info">
              <h3 class="fund-name">{{ fund.name }}</h3>
              <div class="fund-code">{{ fund.code }}</div>
            </div>
            <div class="fund-actions">
              <span :class="[
                'change-value',
                fund.realChange > 0 ? 'positive' : fund.realChange < 0 ? 'negative' : 'neutral'
              ]">
                {{ formatChange(fund.realChange) }}
              </span>
              <a-button type="text" size="small" @click="removeFromFavorites(fund.code)" class="remove-button">
                移除
              </a-button>
            </div>
          </div>

          <!-- 净值信息 -->
          <div class="nav-info-grid">
            <div class="nav-item">
              <div class="nav-label">当前估算净值</div>
              <div class="nav-value current-nav">{{ formatNav(fund.realNetWorth) }}</div>
              <div class="nav-time">{{ fund.realNetWorthTime }}</div>
            </div>
            <div class="nav-item">
              <div class="nav-label">上日净值</div>
              <div class="nav-value previous-nav">{{ formatNav(fund.preRealNetWorth) }}</div>
              <div class="nav-time">{{ fund.preRealNetWorthTime }}</div>
            </div>
          </div>

          <!-- 更新时间 -->
          <div class="update-info">
            <div class="update-label">数据更新时间</div>
            <div class="update-time">{{ fund.time }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 单个基金详情卡片 -->
    <div v-if="singleFundData" class="fund-detail-card single-fund-card">
      <div class="fund-header">
        <div class="fund-basic-info">
          <h2 class="fund-name">{{ singleFundData.name }}</h2>
          <div class="fund-code">{{ singleFundData.code }}</div>
        </div>
        <div class="fund-change-indicator">
          <span :class="[
            'change-value',
            singleFundData.realChange > 0 ? 'positive' : singleFundData.realChange < 0 ? 'negative' : 'neutral'
          ]">
            {{ formatChange(singleFundData.realChange) }}
          </span>
        </div>
      </div>

      <!-- 净值信息 -->
      <div class="nav-info-grid">
        <div class="nav-item">
          <div class="nav-label">当前估算净值</div>
          <div class="nav-value current-nav">{{ formatNav(singleFundData.realNetWorth) }}</div>
          <div class="nav-time">{{ singleFundData.realNetWorthTime }}</div>
        </div>
        <div class="nav-item">
          <div class="nav-label">上日净值</div>
          <div class="nav-value previous-nav">{{ formatNav(singleFundData.preRealNetWorth) }}</div>
          <div class="nav-time">{{ singleFundData.preRealNetWorthTime }}</div>
        </div>
      </div>

      <!-- 更新时间 -->
      <div class="update-info">
        <div class="update-label">数据更新时间</div>
        <div class="update-time">{{ singleFundData.time }}</div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else-if="!loading && !batchLoading && searchQuery && !singleFundData" class="empty-state">
      <div class="empty-icon">
        <SearchOutlined />
      </div>
      <div class="empty-text">未找到相关基金信息</div>
      <div class="empty-desc">请检查基金代码是否正确</div>
    </div>

    <!-- 初始状态提示 -->
    <div v-else-if="!loading && !batchLoading && !searchQuery && favoriteFunds.length === 0" class="initial-state">
      <div class="initial-icon">
        <FundOutlined />
      </div>
      <div class="initial-text">请输入基金代码开始查询</div>
      <div class="initial-desc">支持查询各类公募基金的实时净值信息</div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading || batchLoading" class="loading-state">
      <a-spin size="large" />
      <div class="loading-text">{{ batchLoading ? '正在批量查询基金信息...' : '正在查询基金信息...' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

// 定义基金数据接口
interface FundData {
  name: string;
  code: string;
  preRealNetWorth: number; // 上一次公布的真实净值
  preRealNetWorthTime: string; // 上一次公布的净值时间
  realNetWorth: number; // 当天估算的净值
  realNetWorthTime: string; // 当天估算的净值时间
  realChange: number; // 涨跌幅
  time: string; // 今天的时间
}

// 响应式数据
const searchQuery = ref('');
const singleFundData = ref<FundData | null>(null);
const loading = ref(false);
const batchLoading = ref(false);

// 关注基金相关
const favoriteFunds = ref<string[]>([]);
const favoriteFundData = ref<FundData[]>([]);

// 从 localStorage 加载关注列表
onMounted(() => {
  const savedFavorites = localStorage.getItem('favoriteFunds');
  if (savedFavorites) {
    try {
      favoriteFunds.value = JSON.parse(savedFavorites);
      if (favoriteFunds.value.length > 0) {
        fetchAllFavorites();
      }
    } catch (e) {
      console.error('加载关注基金失败:', e);
    }
  }

  // 监听回车键
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  document.addEventListener('keydown', handleKeyPress);

  // 组件卸载时移除事件监听
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };
});

// 保存关注列表到 localStorage
const saveFavorites = () => {
  localStorage.setItem('favoriteFunds', JSON.stringify(favoriteFunds.value));
};

// 检查是否已关注
const isFavorite = (code: string) => {
  return favoriteFunds.value.includes(code.trim());
};

// 添加到关注
const addToFavorites = () => {
  const code = searchQuery.value.trim();
  if (!code) return;

  if (!isFavorite(code)) {
    favoriteFunds.value.push(code);
    saveFavorites();

    // 如果已经有数据，直接添加到显示列表
    if (singleFundData.value && singleFundData.value.code === code) {
      favoriteFundData.value.push({ ...singleFundData.value });
    }
  }
};

// 从关注中移除
const removeFromFavorites = (code: string) => {
  favoriteFunds.value = favoriteFunds.value.filter(f => f !== code);
  favoriteFundData.value = favoriteFundData.value.filter(f => f.code !== code);
  saveFavorites();
};

// 清空所有关注
const clearAllFavorites = () => {
  favoriteFunds.value = [];
  favoriteFundData.value = [];
  saveFavorites();
};

// 单个基金查询
const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    return;
  }

  loading.value = true;
  singleFundData.value = null;

  try {
    const response = await fetch(`http://localhost:3000/netAsset?inputValue=${searchQuery.value.trim()}`);
    if (!response.ok) {
      throw new Error('网络请求失败');
    }

    const result = await response.json();

    // 验证数据完整性 - 正确处理嵌套的 data 结构
    const data = result.data;
    if (data && data.name && data.code) {
      singleFundData.value = {
        name: data.name,
        code: data.code,
        preRealNetWorth: parseFloat(data.preRealNetWorth) || 0,
        preRealNetWorthTime: data.preRealNetWorthTime || '',
        realNetWorth: parseFloat(data.realNetWorth) || 0,
        realNetWorthTime: data.realNetWorthTime || '',
        realChange: parseFloat(data.realChange) || 0,
        time: data.realNetWorthTime || ''
      };
    } else {
      singleFundData.value = null;
    }
  } catch (error) {
    console.error('查询基金信息失败:', error);
    singleFundData.value = null;
  } finally {
    loading.value = false;
  }
};

// 批量查询所有关注基金
const fetchAllFavorites = async () => {
  if (favoriteFunds.value.length === 0) return;

  batchLoading.value = true;
  favoriteFundData.value = [];

  try {
    // 并发查询所有关注的基金
    const promises = favoriteFunds.value.map(code =>
      fetch(`http://localhost:3000/netAsset?inputValue=${code}`)
        .then(response => response.json())
        .catch(error => {
          console.error(`查询基金 ${code} 失败:`, error);
          return null;
        })
    );

    const results = await Promise.all(promises);

    // 处理结果
    const validFunds: FundData[] = [];
    results.forEach((result, index) => {
      if (result && result.data && result.data.name && result.data.code) {
        const data = result.data;
        validFunds.push({
          name: data.name,
          code: data.code,
          preRealNetWorth: parseFloat(data.preRealNetWorth) || 0,
          preRealNetWorthTime: data.preRealNetWorthTime || '',
          realNetWorth: parseFloat(data.realNetWorth) || 0,
          realNetWorthTime: data.realNetWorthTime || '',
          realChange: parseFloat(data.realChange) || 0,
          time: data.realNetWorthTime || ''
        });
      }
    });

    favoriteFundData.value = validFunds;
  } catch (error) {
    console.error('批量查询基金信息失败:', error);
  } finally {
    batchLoading.value = false;
  }
};

const formatNav = (nav: number): string => {
  if (isNaN(nav) || nav === 0) return '--';
  return nav.toFixed(4);
};

const formatChange = (change: number): string => {
  if (isNaN(change)) return '--';
  if (change === 0) return '0.00%';
  return `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
};
</script>

<style scoped>
.net-asset-value-page {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
  /* min-height: 100vh; */
  height: 100%;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.search-section {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.search-container {
  display: flex;
  gap: 12px;
  max-width: 800px;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.search-button {
  height: 40px;
}

.favorite-button {
  height: 40px;
  white-space: nowrap;
}

/* 关注基金区域 */
.favorites-section {
  margin-bottom: 40px;
}

.favorites-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
}

.favorites-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.batch-actions {
  text-align: center;
  margin-bottom: 20px;
}

.batch-query-button {
  height: 40px;
  padding: 0 24px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

/* 基金详情卡片 */
.fund-detail-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease-in-out;
}

.fund-detail-card:hover {
  transform: translateY(-2px);
}

.single-fund-card {
  max-width: 800px;
  margin: 0 auto 40px auto;
}

.favorites-card {
  margin: 0 !important;
}

.fund-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.fund-basic-info {
  flex: 1;
  min-width: 180px;
}

.fund-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.fund-code {
  font-size: 1rem;
  font-weight: 600;
  color: #1890ff;
  background: rgba(24, 144, 255, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  display: inline-block;
}

.fund-change-indicator {
  text-align: right;
}

.fund-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.change-value {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.2;
}

.change-value.positive {
  color: #f5222d;
}

.change-value.negative {
  color: #52c41a;
}

.change-value.neutral {
  color: #8c8c8c;
}

.remove-button {
  color: #ff4d4f;
  padding: 0;
  height: auto;
}

/* 净值信息网格 */
.nav-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.nav-item {
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e8e8e8;
  transition: all 0.2s ease-in-out;
}

.nav-item:hover {
  border-color: #1890ff;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
}

.nav-label {
  font-size: 0.85rem;
  color: #8c8c8c;
  margin-bottom: 6px;
  font-weight: 500;
}

.nav-value {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 4px;
}

.current-nav {
  color: #2c3e50;
}

.previous-nav {
  color: #666;
}

.nav-time {
  font-size: 0.8rem;
  color: #8c8c8c;
}

/* 更新信息 */
.update-info {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.update-label {
  font-size: 0.85rem;
  color: #8c8c8c;
  margin-bottom: 4px;
}

.update-time {
  font-size: 0.95rem;
  font-weight: 600;
  color: #2c3e50;
}

/* 空状态 */
.empty-state,
.initial-state {
  text-align: center;
  padding: 60px 20px;
  max-width: 500px;
  margin: 0 auto;
}

.empty-icon,
.initial-icon {
  font-size: 3rem;
  color: #bfbfbf;
  margin-bottom: 20px;
}

.empty-text,
.initial-text {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.empty-desc,
.initial-desc {
  font-size: 1rem;
  color: #8c8c8c;
}

/* 加载状态 */
.loading-state {
  text-align: center;
  padding: 60px 20px;
}

.loading-text {
  margin-top: 20px;
  font-size: 1.1rem;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .net-asset-value-page {
    padding: 15px;
  }

  .page-title {
    font-size: 2rem;
  }

  .search-container {
    flex-direction: column;
    align-items: stretch;
  }

  .search-button,
  .favorite-button {
    width: 100%;
  }

  .favorites-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .favorites-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .fund-detail-card {
    padding: 20px;
  }

  .fund-name {
    font-size: 1.2rem;
  }

  .fund-code {
    font-size: 0.9rem;
  }

  .change-value {
    font-size: 1.2rem;
  }

  .nav-value {
    font-size: 1.1rem;
  }

  .nav-info-grid {
    gap: 12px;
  }

  .nav-item {
    padding: 12px;
  }
}
</style>