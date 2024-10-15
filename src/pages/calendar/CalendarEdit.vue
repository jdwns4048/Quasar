<template>
    <q-dialog v-model="isVisible">
        <q-card>
            <q-card-section>
                <q-input v-model="activityName" label="영업 활동" />
                <div style="display: flex; gap: 10px">
                    <div>
                        <q-input filled v-model="startDate" mask="####-##-##" label="시작일">
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                    <q-menu cover>
                                        <q-date v-model="startDate" :title="startDate" subtitle="시작일">
                                            <div class="row items-center justify-end">
                                                <q-btn v-close-popup label="Close" color="primary" flat />
                                            </div>
                                        </q-date>
                                    </q-menu>
                              </q-icon>
                            </template>
                        </q-input>
                    </div>
                    <div>
                        <q-input filled v-model="endDate" mask="####-##-##" label="종료일">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-menu cover>
                                        <q-date v-model="endDate" :title="endDate" subtitle="종료일">
                                            <div class="row items-center justify-end">
                                                <q-btn v-close-popup label="Close" color="primary" flat />
                                            </div>
                                        </q-date>
                                    </q-menu>
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
import {defineComponent, ref, watch} from 'vue';
import {dateToStr} from 'src/plugin/utils/format/date';

export default defineComponent({
    name: 'CalendarEdit',
    setup() {
        const isVisible = ref(false);
        const activityName = ref('');
        const startDate = ref('');
        const endDate = ref('');
        const testDate = ref();
        function open(info) {
            //TODO Date 형식 YYYY-MM-DD 로 변환
            activityName.value = info.event.title;
            startDate.value = dateToStr(info.event.start, 'YYYY-MM-DD');
            endDate.value = dateToStr(info.event.end, 'YYYY-MM-DD');
            isVisible.value = true;
        }

        function onClose() {
            activityName.value = '';
            isVisible.value = false;
        }
        function onSave() {
            isVisible.value = false;
        }
        watch(startDate, (value) => {
          console.log('startDate => ', value);
        },{immediate:true});
        return {
            isVisible,
            activityName,
            startDate,
            endDate,
          testDate,
            open,
            onClose,
            onSave
        };
    }
});
</script>

<style scoped></style>
