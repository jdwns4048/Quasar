<template>
    <div class="q-pa-md" style="max-width: 300px">
        <!-- default -->
        <div class="q-gutter-lg" style="margin-bottom: 60px">
            <p style="font-weight: bold; font-size: 20px">default</p>
            <q-select standout v-model="defaultModel" behavior="menu" :options="simpleData" label="Select" clearable />
            <q-select multiple standout v-model="multipleModel" behavior="menu" :options="simpleData" label="Multiple" clearable />
            <q-select use-chips multiple standout v-model="multipleModel" behavior="menu" :options="simpleData" label="Chips & Multiple" clearable />
        </div>

        <!-- Custom -->
        <div class="q-gutter-lg">
            <p style="font-weight: bold; font-size: 20px">Custom</p>
            <q-select filled v-model="customModel" :options="customData" label="Multi with toggle" multiple emit-value map-options>
                <template v-slot:option="{itemProps, opt, selected, toggleOption}">
                    <q-item v-bind="itemProps">
                        <q-item-section>
                            <div v-html="opt.label" />
                        </q-item-section>
                        <q-item-section side>
                            <!--  <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />-->
                            <q-toggle :model-value="(isAllSelected && opt.value === 0) || selected" @update:model-value="handleToggle(opt)" />
                        </q-item-section>
                    </q-item>
                </template>
            </q-select>
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue';

export default defineComponent({
    name: 'IndexPage',

    components: {},

    setup() {
        const simpleData = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
        const customData = [
            {
                label: 'Select All',
                value: 0
            },
            {
                label: 'Google',
                value: 1
            },
            {
                label: 'Facebook',
                value: 2
            },
            {
                label: 'Twitter',
                value: 3
            },
            {
                label: 'Apple',
                value: 4
            },
            {
                label: 'Oracle',
                value: 5
            }
        ];
        const defaultModel = ref(null);
        const multipleModel = ref(null);
        const customModel = ref<number[]>([]);
        const isAllSelected = computed(() => {
            return customModel.value.length === customData.length - 1;
        });

        const handleToggle = (opt: {value: number}) => {
            if (opt.value === 0) {
                if (isAllSelected.value) {
                    customModel.value = [];
                } else {
                    customModel.value = customData.map(item => item.value).filter(value => value !== 0);
                }
            } else {
                const index = customModel.value.indexOf(opt.value);
                if (index !== -1) {
                    customModel.value.splice(index, 1);
                } else {
                    customModel.value.push(opt.value);
                }
            }
        };
        return {
            simpleData,
            customData,
            defaultModel,
            multipleModel,
            customModel,
            isAllSelected,
            handleToggle
        };
    }
});
</script>
