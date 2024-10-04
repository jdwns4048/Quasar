<template>
    <div class="q-pa-md" style="max-width: 300px">
        <div class="q-gutter-lg" style="margin-bottom: 60px">
            <p style="font-weight: bold; font-size: 20px">input Value</p>
            <q-select label="Mode: 'add'" filled v-model="modelAdd" use-input use-chips multiple hide-dropdown-icon input-debounce="0" new-value-mode="add" />
            <q-select label="Mode: 'add-unique'" filled v-model="modelAddUnique" use-input use-chips multiple hide-dropdown-icon input-debounce="0" new-value-mode="add-unique" />
            <q-select label="Mode: 'toggle'" filled v-model="modelToggle" use-input use-chips multiple hide-dropdown-icon input-debounce="0" new-value-mode="toggle" />
        </div>
        <div class="q-gutter-lg" style="margin-bottom: 60px">
            <p style="font-weight: bold; font-size: 20px">@new-value Event</p>
            <q-select
                label="adding to menu"
                filled
                v-model="addingModel"
                use-input
                use-chips
                multiple
                input-debounce="0"
                @new-value="createValue"
                :options="filterOptions"
                behavior="dialog"
                @filter="filterFn"
            />
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
    name: 'IndexPage',

    components: {},

    setup() {
        const simpleData = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
        const filterOptions = ref(simpleData);
        const modelAdd = ref(null);
        const modelAddUnique = ref(null);
        const modelToggle = ref(null);
        const addingModel = ref<string[]>([]);
        function createValue(val: string, done: (val?: string, mode?: 'add' | 'add-unique' | 'toggle' | undefined) => void) {
            if (val.length > 0) {
                if (!simpleData.includes(val)) {
                    simpleData.push(val);
                }
                done(val, 'toggle');
            }
        }
        function filterFn(val: string, update: (fn: () => void) => void) {
            update(() => {
                if (val === '') {
                    filterOptions.value = simpleData;
                } else {
                    const needle = val.toLowerCase();
                    filterOptions.value = simpleData.filter(v => v.toLowerCase().indexOf(needle) > -1);
                }
            });
        }
        return {
            simpleData,
            filterOptions,
            modelAdd,
            modelAddUnique,
            modelToggle,
            addingModel,
            createValue,
            filterFn
        };
    }
});
</script>
<style scoped></style>
