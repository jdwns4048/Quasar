<template>
  <q-page class="q-pa-md">
    <div style="margin-bottom: 20px; font-size: 18px; font-weight: bold; color: #1976D2">모바일 업무 지원</div>
    <div class="row items-center justify-center q-gutter-lg">
      <q-btn
        size="md"
        color="white"
        text-color="black"
        stack
        style="min-width: 130px"
        @click="changeUrl('/sales-activity')"
      >
        <q-icon name="calendar_month" style="font-size: 40px;" />
        <div style="margin-top: 10px;font-size: 15px">영업활동관리</div>
      </q-btn>

      <q-btn
        size="md"
        color="white"
        text-color="black"
        stack
        style="min-width: 130px"
        @click="changeUrl('/dashboard')"
      >
        <q-icon name="bar_chart" style="font-size: 40px;" />
        <div style="margin-top: 10px;font-size: 15px">수주판매현황</div>
      </q-btn>
      <q-btn
        size="md"
        color="white"
        text-color="black"
        stack
        style="min-width: 130px"
        @click="changeUrl('/company-info')"
      >
        <q-icon name="emoji_transportation" style="font-size: 40px;" />
        <div style="margin-top: 10px;font-size: 15px">고객정보</div>
      </q-btn>
      <q-btn
        size="md"
        color="white"
        text-color="black"
        stack
        style="min-width: 130px"
        @click="changeUrl('/company-contact')"
      >
        <q-icon name="diversity_3" style="font-size: 40px;" />
        <div style="margin-top: 10px;font-size: 13px">고객담당자정보</div>
      </q-btn>
    </div>
  </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'IndexPage',
  components: {},
  setup () {
    const router = useRouter();
    function changeUrl(newUrl: string) {
      router.push(newUrl);
    }
    return{
      changeUrl
    }
  }
});
</script>
