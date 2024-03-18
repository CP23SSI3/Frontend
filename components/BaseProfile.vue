<template>
  <span
    :style="`background-color:
    ${stringToHslColor(fname + '' + lname, 40, 60)};`"
    :class="[
      'inline-flex items-center justify-center',
      styleSize,
      company ? 'rounded-md' : 'rounded-full'
    ]"
  >
    <span class="font-medium leading-none text-white">
      {{
        (fname ? fname[0].toUpperCase() : '') +
        (lname ? lname[0].toUpperCase() : '')
      }}
    </span>
  </span>
</template>
<script lang="ts" setup>
const props = defineProps({
  fname: {
    type: String,
    default: ''
  },
  lname: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'M'
  },
  company: {
    type: Boolean,
    default: false
  }
})

function stringToHslColor(str: string, s: number, l: number) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  var h = hash % 360
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
}

const styleSize = computed(() => {
  if (props.size == 'S') {
    return 'w-8 h-8 text-sm'
  } else if (props.size == 'M') {
    return 'w-10 h-10 text-base'
  } else if (props.size == 'L') {
    return 'w-14 h-14 text-lg'
  } else if (props.size == 'XL') {
    return 'w-24 h-24 text-2xl'
  }
})
</script>
