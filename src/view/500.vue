<template>
    <div class="error-page-container">
        <a-result status="500" title="500 - 服务器错误" sub-title="抱歉，服务器遇到了意外情况，无法完成您的请求。请稍后重试或联系技术支持。">
            <template #extra>
                <a-button type="primary" @click="goHome">
                    返回首页
                </a-button>
                <a-button @click="refreshPage" style="margin-left: 8px">
                    刷新页面
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

const refreshPage = () => {
    // 刷新当前页面
    window.location.reload()
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
    color: #722ed1;
}

:deep(.ant-result-subtitle) {
    font-size: 16px;
    color: #595959;
}
</style>