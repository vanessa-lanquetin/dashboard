<template>
  <template v-if="trackingLine">
  <tr>
    <td>
      {{trackingLine.enterpriseName}}
    </td>
    <td>
      {{date(trackingLine.submissionDate)}}
    </td>
    <td>
      {{getTranslation(trackingLine.type)}}
    </td>
    <td>
      {{trackingLine.jobName}}
    </td>
    <td>
      {{date(trackingLine.relaunchDate)}}
    </td>
    <td class="actions">
      <button @click="$router.push({name: 'tracking-line', params: {trackingLineId: trackingLine.id}})"><i class="fas fa-eye"></i></button>
      <button @click="$emit('deleteTrackingLine', trackingLine.id)"><i class="fas fa-trash"></i></button>
    </td>
  </tr>
  </template>
</template>

<script setup>
import {date, getTranslation} from '../helpers/helper'

defineProps({
  trackingLine: {
    /** @type {import ('../models/TrackingLine').default | null | undefined} */
    default: null
  }
})
defineEmits(['deleteTrackingLine'])

</script>

<style lang="scss" scoped>

</style>