<template>
  <!-- Vérifie si une ligne de suivi est présente -->
  <template v-if="trackingLine">
    <!-- Ajoute la classe 'red-background' si la condition de mise en surbrillance est vraie -->
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
        <!-- Bouton pour voir les détails de la ligne de suivi -->
        <button @click="$router.push({ name: 'tracking-line', params: { trackingLineId: trackingLine._id } })"><i class="fas fa-eye"></i></button>
        <!-- Bouton pour supprimer la ligne de suivi -->
        <button @click="$emit('deleteTrackingLine', trackingLine.id)"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  </template>
</template>

<script setup>
import { date, getTranslation } from '../helpers/helper'

// Définit les propriétés
defineProps({
  trackingLine: {
    /** @type {import ('../models/TrackingLine').default | null | undefined} */
    default: null
  }
})

// Définit les événements émis
defineEmits(['deleteTrackingLine'])

// Fonction pour déterminer si la ligne de suivi doit être mise en surbrillance
const shouldHighlight = (submissionDate, relaunchDate) => {
  if (!submissionDate || !relaunchDate) return false;
  const sixDaysInMilliseconds = 6 * 24 * 60 * 60 * 1000; // 6 jours en millisecondes
  return new Date(relaunchDate) - new Date(submissionDate) >= sixDaysInMilliseconds;
};
</script>

<style lang="scss" scoped>
/* Style pour mettre en surbrillance la ligne de suivi */
.red-background {
  background-color: #d36363;
  border: 2px solid red;
}
</style>
