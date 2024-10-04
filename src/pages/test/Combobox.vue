<template>
    <div class="q-pa-md" style="max-width: 300px">
        <div style="margin-bottom: 100px">
            <p style="font-weight: bold">Combobox</p>
            <q-select standout v-model="defaultModel" behavior="menu" :options="simpleData" label="default" clearable />
        </div>

        <div class="q-gutter-lg">
            <p style="font-weight: bold">Multiple Combobox</p>
            <q-select multiple standout v-model="comboboxModel" behavior="menu" :options="simpleData" label="checkBox" clearable />
            <q-select use-chips multiple standout v-model="comboboxModel" behavior="menu" :options="simpleData" label="chips" clearable />
            <q-select filled multiple v-model="comboboxModel" :options="simpleData" stack-label label="Standard" color="secondary">
                <template v-slot:selected-item="scope">
                    <q-chip removable dense @remove="scope.removeAtIndex(scope.index)" :tabindex="scope.tabindex" color="white" text-color="secondary" class="q-ma-none">
                        <q-avatar color="secondary" text-color="white" :icon="scope.opt" />
                        {{ scope.opt }}
                    </q-chip>
                </template>
            </q-select>

            <q-select disable standout v-model="comboboxModel" :options="simpleData" label="disable" clearable />
            <q-select readonly standout v-model="comboboxModel" :options="simpleData" label="readonly" clearable />
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
    name: 'Combobox',

    components: {},

    setup() {
        const simpleData = ['mail', 'bluetooth', 'map', 'casino', 'home'];
        const defaultModel = ref(null);
        const comboboxModel = ref(null);

        return {
            simpleData,
            defaultModel,
            comboboxModel
        };
    }
});
</script>
