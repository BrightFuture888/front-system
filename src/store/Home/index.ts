import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useHomeStore = defineStore("home", () => {
  const count = ref(0);
  const catInfo = ref<any>({});
  const aiAnswer = ref("");
  const historyAiAnwer = ref([]);
  const doubleCountCompted = computed(() => {
    return count.value * 2;
  });

  const minuseCount = (value = 1) => {
    count.value = count.value - value;
    console.log(count.value);
  };

  const addCount = (value = 1) => {
    count.value = count.value + value;
    console.log(count.value);
  };

  const fetchData = async (str: string, cb?: () => void) => {
    const res = await fetch(
      "http://web-admin-template.manjuu.com:3000/cat/name",
      {
        method: "GET",
      },
    );
    // const controlAbort = new AbortController();
    // setTimeout(() => {
    //   controlAbort.abort();
    // }, 3000);

    const aiRes = await fetch(
      // "http://web-admin-template.manjuu.com:3000/cat/name",
      `/api/chat?inputValue=${encodeURIComponent(str)}`,
      {
        method: "GET",
        // signal: controlAbort.signal,
      },
    );

    const data = await res.json();
    const aiData = await aiRes.json();

    catInfo.value = data;
    aiAnswer.value = aiData.message.content;
    historyAiAnwer.value.push(aiData.message.content);
    console.log(aiData.message.content, 123);

    cb?.();
  };

  return {
    count,
    doubleCountCompted,
    minuseCount,
    addCount,
    catInfo,
    aiAnswer,
    historyAiAnwer,
    fetchData,
  };
});
