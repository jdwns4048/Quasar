<template>
    <q-dialog v-model="isOpened" persistent :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down">
        <q-card class="bg-primary text-white qCard">
            <q-card-section class="test-cardSection">
                <div class="dialogHeader">
                    <span class="text-h6">주소 검색</span>
                    <q-btn class="bg-white text-primary closeBtn" v-close-popup> 닫기 </q-btn>
                </div>
                <div ref="postcodeWrap" class="postcode-iframe-wrap"></div>
                <div class="guide"></div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import {ref, onMounted, watch, nextTick} from 'vue';

export default {
    name: 'PostcodeDialog',
    props: {
        modelValue: Boolean,
        onComplete: Function // 사용자가 데이터를 처리할 수 있도록 콜백을 전달받음
    },
    emits: ['update:modelValue', 'onComplete'],
    setup(props, {emit}) {
        const POSTCODE_WIDTH = '100%';
        const POSTCODE_HEIGHT = '60%';
        const isOpened = ref(props.modelValue);
        const postcodeWrap = ref(null);
        const maximizedToggle = ref(true);

        watch(
            () => props.modelValue,
            newVal => {
                isOpened.value = newVal;
            }
        );

        watch(isOpened, newVal => {
            emit('update:modelValue', newVal); // 자식에서 dialog가 변경될 때 부모에게도 알림

            if (newVal) {
                nextTick(() => {
                    embedPostcode();
                });
            }
        });

        const embedPostcode = () => {
            new (window as any).daum.Postcode({
                onComplete: (data: any) => {
                    emit('onComplete', data); // 콜백으로 처리
                    isOpened.value = false; // 주소 선택 후 다이얼로그 닫기
                },
                width: POSTCODE_WIDTH,
                height: POSTCODE_HEIGHT
            }).embed(postcodeWrap.value!);
        };

        const loadPostcode = () => {
            const script = document.createElement('script');
            script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.async = true;
            script.onload = embedPostcode;
            document.head.appendChild(script);
        };

        onMounted(() => {
            loadPostcode();
        });

        return {POSTCODE_WIDTH, POSTCODE_HEIGHT, isOpened, postcodeWrap, maximizedToggle, embedPostcode, loadPostcode};
    }
};
</script>
<style scoped>
.dialogHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.qCard {
    height: 100vh;
}

.test-cardSection {
    height: 100%;
}

.postcode-iframe-wrap {
    width: 100%;
    height: 100%;
    margin-top: 30px;
}

.guide {
    color: white;
    margin-top: 10px;
}

.closeBtn {
    width: 100px; /* 원하는 너비 */
    height: 30px; /* 원하는 높이 */
}
</style>
