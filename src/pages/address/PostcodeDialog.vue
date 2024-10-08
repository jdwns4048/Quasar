<template>
    <q-dialog v-model="isOpened" persistent maximized transition-show="slide-up" transition-hide="slide-down">
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

<script setup lang="ts">
import {ref, onMounted, watch, nextTick} from 'vue';
import {Address} from 'src/defines/address';

const props = defineProps({
    modelValue: Boolean,
    onComplete: Function
});

const emit = defineEmits(['update:modelValue', 'onComplete']);

const POSTCODE_WIDTH = '100%';
const POSTCODE_HEIGHT = '60%';
const isOpened = ref(props.modelValue);
const postcodeWrap = ref(null); //Postcode 렌더링할 DOM 요소

watch(
    () => props.modelValue,
    newVal => {
        isOpened.value = newVal;
    }
);

watch(isOpened, newVal => {
    emit('update:modelValue', newVal); // isOpened 상태값 변경시 상위 Component로 전달

    if (newVal) {
        nextTick(() => {
            embedPostcode();
        });
    }
});

/**
 * iframe을 통해 카카오 우편번호 서비스 API를 임베딩
 */
const embedPostcode = () => {
    new (window as any).daum.Postcode({
        onComplete: (data: Address) => {
            emit('onComplete', data); // 콜백으로 처리
            isOpened.value = false; // 주소 선택 후 다이얼로그 닫기
        },
        width: POSTCODE_WIDTH,
        height: POSTCODE_HEIGHT
    }).embed(postcodeWrap.value!);
};

/**
 * 카카오 우편번호 서비스 API 스크립트를 로드
 */
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
    width: 100px;
    height: 30px;
}
</style>
