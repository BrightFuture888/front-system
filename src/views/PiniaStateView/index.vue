<template>
    <div>
        <Input  v-model:value="inputValue" />
        <Button @click="clickSetLocalData">点击我存储数据</Button>
    </div>

</template>


<script setup lang="ts">
import { Button,Input } from 'ant-design-vue';
import { ref } from 'vue';

const inputValue = ref('');
const clickSetLocalData = () => {
    console.log('我创建了一条数据');

    localStorage.setItem('name', 'zhangsan');
    sessionStorage.setItem('inputValue', inputValue.value);
}

</script>