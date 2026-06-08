<script setup lang="ts">
import { useHomeStore } from "@/store/Home";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const inputValue = ref('');
const store = useHomeStore();
const { count, doubleCountCompted, catInfo, aiAnswer } = storeToRefs(store);

const minuseFunc = () => {
  store.minuseCount(1); // ✅ 调用仓库方法修改状态
};

const sendBeaconFunc = () => {
  navigator.sendBeacon('http://localhost:3000/logInfo/recevicelogInfo', JSON.stringify({
    logInfo: inputValue.value || '12313'
  }));
};
</script>

<template>
  <div class="card flex flex-col">
    <div>
      <a-button type="primary" @click="() => {
        sendBeaconFunc()
      }">
        sendBeacon数据{{ inputValue }}
      </a-button>
      <div>小猫的信息: {{ catInfo }}</div>
      <!-- <div>AI的回答: <span v-text="aiAnswer"></span></div> -->
      <a-input type="text" v-model:value="inputValue"></a-input>
      <!-- <a-input type="text" v-model="inputValue"></a-input> -->
      <a-button type="default" @click="store.fetchData(inputValue)">
        fetch数据
      </a-button>
    </div>
    <div>
      <a-button type="default" @click="store.addCount(5)">
        count is {{ count }}, doubleCount is {{ doubleCountCompted }}
      </a-button>
    </div>

    <div>
      <a-button type="default" @click="minuseFunc">
        减 count is {{ count }}
      </a-button>
    </div>
  </div>
</template>
