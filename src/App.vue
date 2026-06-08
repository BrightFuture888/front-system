<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }"
        @select="handleSelect">
       <a-menu-item key="/entrance">首页</a-menu-item>
        <a-menu-item v-for="value in accessRoutes" :key="value.path">{{ value.meta.title }}</a-menu-item>
      </a-menu>
    </a-layout-header>

    <a-layout-content class="layout-content">
      <div class="layout-content-section">

        <RouterView v-if="!isMicroAppVisible"></RouterView>
       <div v-show="isMicroAppVisible" id="micro-container">
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import routesArr from "@/router/routes";
import { accessRoutes } from "@/router/access";
const routes = useRoute();
const router = useRouter();
const selectedKeys = ref<string[]>([]);
const isMicroAppVisible = ref(false)


watch(() => routes.fullPath, (val) => {
  const result = routesArr.filter((item) => {
    return val.includes(item.path)
  })
  const resultObj = result.length === 1 ? result[0] : result?.[1]

  if (resultObj?.meta?.isMicroAppRoute) {
    isMicroAppVisible.value = true
  } else {
    isMicroAppVisible.value = false
  }

  nextTick(() => {
    const key = val.split('/')[1]
    selectedKeys.value = [`/${key}`]
  })
})


// router.beforeEach((to) => {
//   const result = routesArr.filter((item) => {
//     return to.fullPath.includes(item.path)

//   })
//   const resultObj = result.length === 1 ? result[0] : result?.[1]

//   if (resultObj?.meta?.isMicroAppRoute) {
//     isMicroAppVisible.value = true
//   } else {
//     isMicroAppVisible.value = false
//   }

//   if (selectedKeys.value.length) return
//   const key = to.fullPath.split('/')[1]
//   selectedKeys.value = [`/${key}`]
// })



const handleSelect = (value: { key: string }) => {
  const { key } = value
  router.replace({
    path: key
  })
};
</script>
<style scoped>
.layout {
  height: 100vh;
}

.layout-content {
  height: 100%;
}

.layout-content-section {
  height: 100%;
}

#micro-container {
  height: 100%;
}
</style>
