<template>
  <template v-if="trackingLine">
    <tr :class="{ 'red-background': shouldHighlight(trackingLine.submissionDate, trackingLine.relaunchDate) }">
      <td>
        {{ trackingLine.enterpriseName }}
      </td>
      <td>
        {{ date(trackingLine.submissionDate) }}
      </td>
      <td>
        {{ getTranslation(trackingLine.type) }}
      </td>
      <td>
        {{ trackingLine.jobName }}
      </td>
      <td>
        {{ date(trackingLine.relaunchDate) }}
      </td>
      <td class="actions">
        <button @click="$router.push({ name: 'tracking-line', params: { trackingLineId: trackingLine.id } })"><i class="fas fa-eye"></i></button>
        <button @click="$emit('deleteTrackingLine', trackingLine.id)"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  </template>
</template>

<script setup>
import { date, getTranslation } from '../helpers/helper'

defineProps({
  trackingLine: {
    /** @type {import ('../models/TrackingLine').default | null | undefined} */
    default: null
  }
})
defineEmits(['deleteTrackingLine'])

const shouldHighlight = (submissionDate, relaunchDate) => {
  if (!submissionDate || !relaunchDate) return false;
  const sixDaysInMilliseconds = 6 * 24 * 60 * 60 * 1000; // 6 days in milliseconds
  return new Date(relaunchDate) - new Date(submissionDate) >= sixDaysInMilliseconds;
};
</script>

<style lang="scss" scoped>
.red-background {
  background-color: #d36363;
  border: 2px solid red;
}
</style>
