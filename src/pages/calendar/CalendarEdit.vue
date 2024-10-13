<template>
  <q-dialog v-model="isVisible" >
    <q-card class="column full-height">
      <q-card-section>
        <q-input v-model="activityName" label="영업 활동" />
        <!-- TODO Q-Date -->
        <div style="display: flex">
          <div class="q-pa-md">
            <q-input filled v-model="startDate" mask="date" :rules="['date']" label="시작일">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-menu cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="startDate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-menu>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="q-pa-md">
            <q-input filled v-model="endDate" mask="date" :rules="['date']" label="종료일">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="endDate">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="닫기" @click="onClose" />
        <q-btn flat label="저장" @click="onSave" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
export default defineComponent({
  name: 'CalendarEdit',
  setup() {
    const isVisible = ref(false);
    const activityName = ref('');
    const startDate = ref(null);
    const endDate = ref(null);
    function open(info) {
      console.log('Opening edit popup => ', info);
      activityName.value = info.event.title;
      startDate.value = info.event.start;
      endDate.value = info.event.end;
      isVisible.value = true;
    }

    function onClose() {
      activityName.value = '';
      isVisible.value = false;
    }
    function onSave() {
      isVisible.value = false;
    }
    return {
      isVisible,
      activityName,
      startDate,
      endDate,
      open,
      onClose,
      onSave
    };
  }
});
</script>

<style scoped>
</style>
