<template>
  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-xl">

      <q-select @filter="filterFn" input-debounce="0" use-input standout v-model="largeModel" behavior="menu" :options="largeData" label="AutoComplete-menu"  clearable>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select @filter="filterFn" input-debounce="0" use-input standout v-model="largeModel" behavior="dialog" :options="largeData" label="AutoComplete-dialog" clearable>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select hint="filtering more than 2chars" @filter="minCharFilter" input-debounce="0" use-input standout v-model="largeModel" behavior="menu" :options="largeData" label="AutoComplete-minChar" clearable>
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

const sample1: { label: string; value: string }[] = [];
for (let i = 0; i < 500; i++) {
  const randomData = Math.random().toString(36).substring(2, 15);
  sample1.push({ label: randomData, value: randomData });
}

export default defineComponent({
  name: 'Autocomplete',

  components: {},

  setup () {
    const largeData = ref(sample1);
    const largeModel = ref(null);

    const filterFn = (val: string, update: Function) => {
      update(() => {
        const needle = val.toLowerCase();
        largeData.value = sample1.filter(v => v.label.toLowerCase().includes(needle));
      });
    };

    const minCharFilter = (val: string, update: Function, abort: Function) => {
      if (val.length < 2) {
        abort();
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        largeData.value = sample1.filter(v => v.label.toLowerCase().includes(needle));
      });
    }

    return {
      largeModel,
      largeData,
      filterFn,
      minCharFilter
    };
  }
});
</script>
