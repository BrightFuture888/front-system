<script setup lang="ts">
import { useHomeStore } from "@/store/Home";
import { storeToRefs } from "pinia";
import { Sender, Bubble } from "ant-design-x-vue";
import { ref } from "vue";
import { message } from "ant-design-vue";

defineOptions({ name: "AXSenderBasic" });

// const allAnsWer = ref([]);

const store = useHomeStore();
const { historyAiAnwer, aiAnswer } = storeToRefs(store);

const loading = ref(false);

const closeLoading = () => {
    loading.value = false;
};
const userInput = ref('')


const handleSubmit = async (value: any) => {
    try {
        userInput.value = value
        loading.value = true;
        await store.fetchData(value, closeLoading);
        userInput.value = ''
    } catch (error) {
        message.error('请求超时，请稍后重试')
        closeLoading()
    } finally {
        closeLoading()
    }
};
</script>

<template>


    <div class="flex flex-col h-screen max-w-4xl mx-auto w-full">
        <!-- 标题 -->
        <div class="py-4 text-center font-bold text-lg border-b">
            与 AI 的对话
        </div>

        <!-- 聊天区域（自动滚动到底部） -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            <div v-for="(item, index) in historyAiAnwer" :key="index" class="flex"
                :class="false ? 'justify-end' : 'justify-start'">
                <Bubble class="whitespace-pre-wrap max-w-[80%] shadow-sm" :typing="{ step: 2, interval: 30 }"
                    :content="item" />
            </div>
        </div>

        <!-- 输入框（固定底部） -->
        <div class="p-4 border-t bg-white">
            <Sender :loading="loading" :onSubmit="handleSubmit" :value="userInput" class="w-full" />
        </div>
    </div>
</template>
