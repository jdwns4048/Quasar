<template>
    <q-page class="q-pa-md">
        <div class="container">
            <q-btn color="primary" label="주소 검색" @click="openPostcode" />
            <q-dialog class="test-dialog" v-model="dialog" persistent :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down">
                <q-card class="bg-primary text-white" style="height: 100vh">
                    <q-bar>
                        <q-space />
                        <q-btn dense flat icon="close" v-close-popup>
                            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                        </q-btn>
                    </q-bar>

                    <q-card-section class="test-cardSection" style="height: 100%">
                        <div class="text-h6">주소 검색</div>
                        <div ref="postcodeWrap" class="postcode-iframe-wrap" style="width: 100%; height: 100%"></div>
                        <div id="guide" style="color: white; margin-top: 10px"></div>
                    </q-card-section>
                </q-card>
            </q-dialog>
            <q-input v-model="address" label="주소" filled type="textarea" readonly style="margin-top: 20px" rows="25" />
        </div>
    </q-page>
</template>

<script lang="ts">
// import
import {ref} from 'vue';

export default {
    name: 'TestLocation',
    setup() {
        const dialog = ref(false);
        const address = ref('');
        const postcodeWrap = ref<HTMLDivElement | null>(null);
        const maximizedToggle = ref(true);

        const openPostcode = () => {
            dialog.value = true;
            setTimeout(() => {
                loadPostcode(); // 다이얼로그가 열린 후에 API 로드
            }, 0);
        };

        const loadPostcode = () => {
            const script = document.createElement('script');
            script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
            script.async = true;
            script.onload = () => {
                new (window as any).daum.Postcode({
                    oncomplete: (data: any) => {
                        address.value = formatAddress(data);

                        dialog.value = false; // 다이얼로그 닫기
                    },
                    width: '100%',
                    height: '100%'
                }).embed(postcodeWrap.value!);
            };
            document.head.appendChild(script);
        };

        const formatAddress = (data: any) => {
            let formattedAddress = '';

            // 모든 키와 값을 출력, 값이 없으면 '' 표시
            Object.keys(data).forEach(key => {
                const value = data[key] || ''; // 값이 없으면 ''로 설정
                formattedAddress += `${key}: ${value}\n`; // 각 줄마다 key: value 형식으로 추가
            });

            return formattedAddress; // 문자열로 반환
        };

        return {dialog, address, maximizedToggle, postcodeWrap, openPostcode, formatAddress};
    }
};
</script>

<style>
.container {
    height: 500px;
}
</style>
