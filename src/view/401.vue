<template>
    <div class="error-page-container">
        <a-result status="403" title="401 - 未授权" sub-title="抱歉，您没有访问该页面的权限。请登录或联系管理员获取访问权限。">
            <template #extra>
                <a-button type="primary" @click="goHome">
                    返回首页
                </a-button>
                <!-- <a-button @click="goLogin" style="margin-left: 8px">
                    重新登录
                </a-button> -->
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

// const goLogin = () => {
//     // 跳转到登录页，根据实际项目结构调整
//     router.push('/login')
// }
</script>

<style scoped>
.error-page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    /* min-height: 100vh; */
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
    color: #1d39c4;
}

:deep(.ant-result-subtitle) {
    font-size: 16px;
    color: #595959;
}
</style>