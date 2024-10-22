<template>
      <q-card v-model="isVisible" v-touch-swipe.mouse="onSwipe" >
        <q-card-section>
          <p>{{activityName}}</p>
          <div style="display: flex; gap: 10px">
              <q-input filled v-model="startDate" mask="####-##-##" label="시작일">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-menu>
                      <q-date v-model="startDate" :title="startDate" mask="YYYY-MM-DD" subtitle="시작일">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-menu>
                  </q-icon>
                </template>
              </q-input>

              <q-input filled v-model="endDate" mask="####-##-##" label="종료일">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-menu>
                      <q-date v-model="endDate" :title="endDate" mask="YYYY-MM-DD" subtitle="종료일">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-menu>
                  </q-icon>
                </template>
              </q-input>
            </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="닫기" @click="onClose" />
          <q-btn flat label="저장" @click="onSave" />
        </q-card-actions>
      </q-card>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {dateToStr} from 'src/plugin/utils/format/date';

export default defineComponent({
    name: 'CalendarEdit',
    setup() {
        const isVisible = ref(false);
        const activityName = ref('');
        const startDate = ref('');
        const endDate = ref('');

        function open(event) {
            isVisible.value = true;
            activityName.value = event.title;
            startDate.value = dateToStr(event.start, 'YYYY-MM-DD');
            endDate.value = dateToStr(event.end, 'YYYY-MM-DD');
        }

        function onClose() {
            activityName.value = '';
            isVisible.value = false;
        }
        function onSave() {
            isVisible.value = false;
        }
        function onSwipe(event){
          console.log('swipe');
        }
        return {
            isVisible,
            activityName,
            startDate,
            endDate,
            open,
            onClose,
            onSave,
          onSwipe
        };
    }
});
</script>

<style scoped></style>
