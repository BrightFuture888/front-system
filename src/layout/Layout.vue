<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleSelect = (values: any) => {
    // const { name } = route
    const { key } = values
    if (!!key) {
        router.replace(key)
    }
};

</script>

<template>
    <div class="h-full">
        <a-layout class="h-full">
            <a-layout class="h-full">
                <a-layout-sider width="200" style="background: #fff">
                    <a-menu @select="handleSelect">
                        <a-menu-item key="/home">首页</a-menu-item>
                        <a-menu-item key="/pinia">PiniaView</a-menu-item>
                        <a-menu-item key="/net-asset-value">资产净值</a-menu-item>
                        <a-menu-item key="/aiChat">AiChat</a-menu-item>
                    </a-menu>
                </a-layout-sider>
                <a-layout class=" h-full">
                    <a-layout-content class="p-6 h-full overflow-auto">
                        <RouterView />
                    </a-layout-content>
                </a-layout>
            </a-layout>
        </a-layout>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
}

.container-header {
    display: flex;
    gap: 4px;
    justify-content: center;
}
</style>