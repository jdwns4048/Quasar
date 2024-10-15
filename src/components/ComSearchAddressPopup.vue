<template>
    <q-dialog v-model="isVisible" persistent maximized transition-show="slide-up" transition-hide="slide-down">
        <q-card class="bg-primary text-white qCard">
            <q-card-section class="test-cardSection">
                <div class="dialogHeader">
                    <span class="text-h6">주소 검색</span>
                    <q-btn class="bg-white text-primary closeBtn" @click="close"> 닫기 </q-btn>
                </div>
                <div ref="postcodeWrap" class="postcode-iframe-wrap"></div>
                <div class="guide"></div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import {ref, onMounted, nextTick} from 'vue';
import {Postcode} from 'src/defines/postcode';

const POSTCODE_WIDTH = '100%';
const POSTCODE_HEIGHT = '60%';
const isVisible = ref(false);
const postcodeWrap = ref(null);
const isNew = ref(true);
const searchKeyword = ref<string | null>('기흥테라타워');

/**
 * iframe을 통해 다이얼로그(팝업) 표시
 */
function embedPostcode(resolve: (data: Postcode) => void): void {
    new (window as any).daum.Postcode({
        width: POSTCODE_WIDTH,
        height: POSTCODE_HEIGHT,
        onComplete: (data: Postcode) => {
            resolve(data);
            close();
        }
    }).embed(postcodeWrap.value!, {
        q: searchKeyword.value
    });
}

/**
 * 카카오 우편번호 서비스 API 스크립트를 로드
 */
function initializePostcode(): Promise<Postcode> {
    return new Promise(resolve => {
        if (isNew.value) {
            const script = document.createElement('script');
            script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.async = true;
            script.onload = () => {
                isNew.value = false;
                embedPostcode(resolve);
            };
            document.head.appendChild(script);
        } else {
            embedPostcode(resolve);
        }
    });
}

/**
 * 팝업을 엽니다.
 */
function open(): Promise<Postcode> {
    return new Promise(resolve => {
        isVisible.value = true;
        nextTick(() => {
            embedPostcode(resolve);
        });
    });
}

/**
 * 팝업을 닫습니다.
 */
function close(): void {
    clear();
}

function clear(): void {
    isVisible.value = false;
}

onMounted(() => {
    initializePostcode();
});

defineExpose({open, close});
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
