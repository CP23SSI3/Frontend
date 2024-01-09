<template>
  <!-- Filter -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <BaseTitleForm>Filter</BaseTitleForm>
      <BaseItem
        @click="$emit('cancel')"
        type="reset"
        class="mr-10 cursor-pointer lg:mr-0 hover:text-gray-800"
        :icon="ArrowPathIcon"
        >clear</BaseItem
      >
    </div>
    <BaseInput
      label="คำที่ต้องการค้นหา"
      type="search"
      id="search"
      placeholder="ค้นหา..."
      :iconInput="MagnifyingGlassIcon"
      v-model="filter.search"
    ></BaseInput>
    <div>
      <BaseLabel id="postTag" :icon="TagIcon">Tags</BaseLabel>
      <Multiselect
        v-model="filter.postTag"
        mode="tags"
        :close-on-select="false"
        :searchable="true"
        :create-option="false"
        :options="listPositionTag"
        class="multiselect-blue"
        :max="5"
        noResultsText="-- ไม่พบข้อมูล --"
      />
      <span class="text-xs text-gray-400"
        >ค้นหา tag ที่เกี่ยวข้อง เลือกได้สูงสุด 5 tags</span
      >
    </div>

    <BaseLine />
    <div class="flex flex-col gap-4">
      <BaseDropdown
        :option-lists="statusLists"
        label="การรับสมัคร"
        v-model="filter.status"
      >
      </BaseDropdown>
      <div class="space-y-1">
        <BaseLabel id="postTag" :icon="MapPinIcon">สถานที่ฝึกงาน</BaseLabel>
        <!-- <Multiselect
          v-model="filter.location"
          mode="tags"
          placeholder="เขต - จังหวัด"
          :close-on-select="false"
          :searchable="true"
          :create-option="false"
          :options="listLocation"
          :max="3"
          class="multiselect-blue"
        /> -->
        <Multiselect
          v-model="filter.location"
          :searchable="true"
          :close-on-select="true"
          :create-option="false"
          :show-labels="false"
          :options="listLocation"
          :max="1"
          class="multiselect-blue"
          noResultsText="-- ไม่พบข้อมูล --"
          @select="$emit('setLocation')"
          @clear="$emit('clearLocation')"
        />
        <span class="text-xs text-gray-400"
          >พิมพ์ ชื่อจังหวัด, เขต เพื่อค้นหา</span
        >
      </div>

      <BaseInput
        label="ระยะเวลาที่ทำงาน (ขั้นต่ำ)"
        id="workMonth"
        type="number"
        :icon="ClockIcon"
        unit="เดือน"
        v-model="filter.workMonth"
      ></BaseInput>
      <BaseInput
        label="ค่าตอบแทน (ขั้นต่ำ)"
        id="price"
        type="number"
        :icon="CurrencyDollarIcon"
        unit="บาท/วัน"
        v-model="filter.salary"
      ></BaseInput>
    </div>
    <BaseButton full @click="$emit('search')">ค้นหา</BaseButton>
  </div>
</template>

<script setup>
import {
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  TagIcon,
  StarIcon as ActiveStarIcon
} from '@heroicons/vue/20/solid'

const statusLists = [
  {
    id: 1,
    text: 'เปิดอยู่',
    color: 'fill-gray-500',
    value: 'NEARLY_CLOSED,OPENED,ALWAYS_OPENED'
  },
  {
    id: 2,
    text: 'เปิดรับตลอด',
    color: 'fill-green-500',
    value: 'ALWAYS_OPENED'
  },
  {
    id: 3,
    text: 'ใกล้ปิดรับสมัคร',
    color: 'fill-yellow-500',
    value: 'NEARLY_CLOSED'
  },
  { id: 4, text: 'ปิดรับสมัคร', color: 'fill-red-500', value: 'CLOSED' }
]
const props = defineProps({
  filter: {
    type: Object,
    required: true
  }
})

defineEmits(['cancel', 'search', 'setLocation', 'clearLocation'])

// --- GET : position-tag (postTag) ---
const listPositionTag = ref([])
const getListPositionTag = async () => {
  listPositionTag.value = []
  try {
    const res = await usePositionTag()
    if (res.value.status === 200) {
      res.value.data.forEach((item) => {
        listPositionTag.value.push(item.positionTagName)
      })
    }
  } catch (error) {
    Swal.fire({
      showConfirmButton: true,
      timerProgressBar: true,
      confirmButtonColor: 'blue',
      icon: 'error',
      title: 'Error',
      text: 'get /position-tag ใช้งานไม่ได้'
    })
  }
}
await getListPositionTag()

const listLocation = ref([])
const { data } = await useFetch('/api/locations-thai')

const setListLocation = () => {
  data.value.forEach((city) => {
    listLocation.value.push(city.name_th)
    city.amphure.forEach((district) => {
      let text = district.name_th + ', ' + city.name_th
      listLocation.value.push(text)
    })
  })
}
setListLocation()
</script>

<style lang="scss" scoped>
.multiselect-blue {
  --ms-tag-bg: #dbeafe;
  --ms-tag-color: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
  --ms-option-bg-selected: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
  --ms-option-color-pointed: #2563eb;
  --ms-option-bg-selected-pointed: #2563eb;
}
</style>
