<template>
  <div class="row justify-center">
    <q-dialog persistent>
      <q-card class="dialog-card row">
        <q-btn class="arrow" icon="arrow_left"></q-btn>
        <q-card class="column card-main">
          <q-card-section class="col-3 calendar-header">
            <div class="text-h4">2020.10.10</div>
          </q-card-section>
          <q-card-section class="q-pt-none col-7 calendar-main" round>
            <q-list>
              <q-item v-for="item in sampleList" :key="item.key">
                <q-item-section avatar>
                  <q-icon name="check" />
                  <!-- 아이콘을 여기 추가 -->
                </q-item-section>
                <q-item-section>
                  {{ item.label }}
                </q-item-section>
              </q-item></q-list
            >
          </q-card-section>

          <q-card-actions class="col-2 calendar-footer" align="evenly">
            <q-btn class="button" color="primary" label="편집" />
            <q-btn class="button" color="primary" label="닫기" v-close-popup />
          </q-card-actions>
        </q-card>
        <q-btn class="arrow" icon="arrow_right"></q-btn>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
export default  defineComponent({
  name:'CalendarDetail',
  props:{
    isOpened:{
      type:Boolean,
      required:true
    }
  },
  setup(props){
    const isOpenedVisible = props.isOpened
    const sampleList = [
      {key: 1, label: 'quasar layout 확인하기'},
      {key: 2, label: '달력 상세페이지 만들기'},
      {key: 3, label: '편집페이지 사용 여부 확인'}
    ];
    return{
      isOpenedVisible,
      sampleList
    }
  }
});
</script>
<style scoped>
.dialog-card {
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  background-color: darkgray;
}

.card-main {
  height: 100%;
  width: 70%;
  background-color: darkgray;
}

.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1d1d1d;
  background-color: white;
}

.calendar-main {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: bisque;
  width: 100%;
}

.calendar-footer {
  background-color: white;
}

.arrow {
  background-color: white;
}

.button {
  width: 20%;
}
</style>
