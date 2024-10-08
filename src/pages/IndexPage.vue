<template>
    <q-page class="q-pa-md">
        <div class="column items-center justify-center q-gutter-lg">
            <q-btn class="item-button" size="md" color="white" text-color="black" stack @click="changeUrl('/calendar')">
                <q-icon class="button-icon" name="calendar_month" />
                <div>Calendar</div>
            </q-btn>

            <q-btn class="item-button" size="md" color="white" text-color="black" stack @click="changeUrl('/map')">
                <q-icon class="button-icon" name="pin_drop" />
                <div>지도</div>
            </q-btn>
            <q-btn class="item-button" size="md" color="white" text-color="black" stack @click="changeUrl('/location')">
                <q-icon class="button-icon" name="my_location" />
                <div>주소 검색</div>
            </q-btn>
        </div>
    </q-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useRouter} from 'vue-router';
export default defineComponent({
    name: 'IndexPage',
    components: {},
    setup() {
        const router = useRouter();
        function changeUrl(newUrl: string) {
            router.push(newUrl);
        }

        return {
            changeUrl
        };
    }
});
</script>
<style scoped>
.q-pa-md {
    display: flex;
    justify-content: center;
}
.item-button {
    min-width: 130px;
}

.button-icon {
    font-size: 40px;
}

.item-button > div {
    margin-top: 10px;
    font-size: 13px;
}
</style>
