<template>
    <div class="error-page-container">
        <a-result status="403" title="403 - 禁止访问" sub-title="抱歉，您没有权限访问此页面。请联系管理员或返回首页。">
            <template #extra>
                <a-button type="primary" @click="goHome">
                    返回首页
                </a-button>
                <a-button @click="contactAdmin" style="margin-left: 8px">
                    联系管理员
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

const contactAdmin = () => {
    // 可以根据实际需求实现联系管理员的逻辑
    // 例如：打开邮件客户端、跳转到联系方式页面等
    alert('请联系系统管理员获取帮助')
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
    color: #cf1322;
}

:deep(.ant-result-subtitle) {
    font-size: 16px;
    color: #595959;
}
</style>