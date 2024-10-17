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
import {ref, nextTick} from 'vue';
import {Postcode} from 'src/defines/postcode';

const props = defineProps({
    searchKeyword: {
        type: String,
        default: null
    }
});

//팝업 사이즈
const POSTCODE_WIDTH = '100%';
const POSTCODE_HEIGHT = '60%';

const isVisible = ref<boolean>(false);
const postcodeWrap = ref<HTMLDivElement | null>(null); //우편번호 iframe을 포함할 DOM 요소
const isNew = ref<boolean>(true);
const keyword = ref<string | null>(null);

/**
 * 주소 검색 팝업을 iframe으로 임베드하여 표시합니다.
 * @param resolve - 주소 검색 결과를 반환하는 함수
 */
function embedPopup(resolve: (data: Postcode) => void): void {
    new (window as any).daum.Postcode({
        width: POSTCODE_WIDTH,
        height: POSTCODE_HEIGHT,
        onComplete: (data: Postcode) => {
            resolve(data);
            close();
        }
    }).embed(postcodeWrap.value!, {
        q: props.searchKeyword
        // q: keyword.value
    });
}

/**
 * 카카오 우편번호 API 스크립트를 로드합니다.
 * 이미 로드된 경우 중복 호출을 방지합니다.
 * @returns {Promise<void>} - 스크립트 로드 완료 후 Promise 반환
 */
function loadApiScript(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (isNew.value) {
            const script = document.createElement('script');
            script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.async = true;
            script.onload = () => {
                isNew.value = false;
                resolve();
            };
            script.onerror = () => {
                reject(new Error('script 호출 실패'));
            };
            document.head.appendChild(script);
        } else {
            resolve();
        }
    });
}

/**
 * 주소 검색 팝업을 엽니다.
 *
 * @returns {Promise<Postcode>} - 팝업에서 선택한 주소 데이터가 포함된 Promise 객체
 */
function open(searchKeyword: string | null = null): Promise<Postcode> {
    return new Promise(resolve => {
        keyword.value = searchKeyword;
        isVisible.value = true;
        nextTick(() => {
            loadApiScript()
                .then(() => {
                    embedPopup(resolve);
                })
                .catch(error => {
                    console.error(error);
                });
        });
    });
}

/**
 * 주소 검색 팝업을 닫습니다.
 */
function close(): void {
    clear();
}

/**
 * 상태 초기화
 */
function clear(): void {
    isVisible.value = false;
}

defineExpose({open});
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
