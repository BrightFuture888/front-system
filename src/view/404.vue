<template>
    <div class="error-page-container">
        <a-result status="404" title="404 - 页面未找到" sub-title="抱歉，您访问的页面不存在。可能是页面已被删除或移动了位置。">
            <template #extra>
                <a-button type="primary" @click="goHome">
                    返回首页
                </a-button>
                <a-button @click="goBack" style="margin-left: 8px">
                    返回上一页
                </a-button>
            </template>
        </a-result>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/')
}

const goBack = () => {
    // 尝试返回上一页，如果没有历史记录则返回首页
    if (window.history.length > 1) {
        router.back()
    } else {
        router.push('/')
    }
}
</script>

<style scoped>
.error-page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
}

:deep(.ant-result) {
    max-width: 600px;
    width: 100%;
    padding: 24px;
}

:deep(.ant-result-title) {
    font-size: 32px;
    font-weight: 600;
    color: #fa8c16;
}

:deep(.ant-result-subtitle) {
    font-size: 16px;
    color: #595959;
}
</style>