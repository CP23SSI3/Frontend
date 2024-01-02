<template>
  <!-- Filter -->
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <BaseTitleForm>Filter</BaseTitleForm>
      <BaseItem
        @click="clearSearchValue()"
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
      />
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
        <Multiselect
          v-model="filter.location"
          mode="tags"
          placeholder="เขต - จังหวัด"
          :close-on-select="false"
          :searchable="true"
          :create-option="false"
          :options="listLocation"
          :max="3"
          class="multiselect-blue"
        />
        <span class="text-xs text-gray-400"
          >พิมพ์เพื่อค้นหา และเลือกสูงสุด 3 เขต</span
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
    <BaseButton full @click="search()">ค้นหา</BaseButton>
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
  { id: 0, text: '--เลือก--' },
  { id: 1, text: 'เปิดรับตลอด', color: 'fill-green-500' },
  { id: 2, text: 'ยังไม่ปิดรับสมัคร', color: 'fill-gray-500' },
  { id: 3, text: 'ปิดรับสมัครแล้ว', color: 'fill-red-500' },
  { id: 4, text: 'ใกล้ปิดรับสมัคร', color: 'fill-yellow-500' }
]

// -- Search Zone --
const filter = ref({
  search: '',
  postTag: [],
  location: [],
  workMonth: null,
  salary: null,
  status: { id: 0, text: '--เลือก--' }
})

const clearSearchValue = () => {
  filter.value = {
    search: '',
    postTag: [],
    location: [],
    workMonth: null,
    salary: null,
    status: { id: 0, text: '--เลือก--' }
  }
}

// --- GET : position-tag (postTag) ---
const listPositionTag = ref([])
const getListPositionTag = async () => {
  listPositionTag.value = []
  try {
    const res = await usePositionTag()
    if (res.value.status === 200) {
      console.log(res.value.message)
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
  })
  data.value.forEach((city) => {
    city.amphure.forEach((district) => {
      let text = district.name_th + ' - ' + city.name_th
      listLocation.value.push(text)
    })
  })
}
setListLocation()

const search = () => {
  console.log(filter.value)
}
</script>

<style lang="scss" scoped>
.multiselect-blue {
  --ms-tag-bg: #dbeafe;
  --ms-tag-color: #2563eb;
  --ms-ring-color: rgba(56, 189, 248, 0.2);
}
</style>
