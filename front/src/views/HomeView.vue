<template>
    <div class="form-root">
    <div class="header">
      <h1>Tableau de bord de suivi de candidatures</h1>
      <button class="buttonAdd" @click="addTrackingLine"><i class="fas fa-plus"></i></button>
    </div>


    <div class="table-container">
      <table id="applications-table">
        <thead>
          <tr>
            <th>Nom de l'entreprise</th>
            <th>Date d'envoi de candidature</th>
            <th>Type</th>
            <th>Nom du poste</th>
            <th>Date de relance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <TrackingLineRow
            v-for="trackingLine of trackingLines"
            :key="trackingLine.id"
            :trackingLine="trackingLine"
            @delete-tracking-line="deleteTrackingLine"
          />
        </tbody>
      </table>
    </div>
    <modal ref="addModal" width="90%">
      <template #header="">
        Ajout d'une candidature
      </template>
      <template #body="">
        <div>
          <form id="application-form">
            <label for="company-name">Nom de l'entreprise</label>
            <input type="text" id="company-name" required v-model="toInsert.enterpriseName"/>

            <label for="application-date">Date d'envoi de candidature</label>
            <input type="date" id="application-date" v-model="toInsert.submissionDate" />

            <label for="application-type">Type</label>
            <select id="application-type" v-model="toInsert.type">
              <option value="offer">Offre</option>
              <option value="spontaneous-candidacy">Candidature spontanée</option>
            </select>

            <label for="job-title">Nom du poste</label>
            <input type="text" id="job-title" required v-model="toInsert.jobName"/>

            <label for="follow-up-date">Date de relance</label>
            <input type="date" id="follow-up-date" v-model="toInsert.relaunchDate"/>
          </form>
        </div>
      </template>
    </modal>
</div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import {v4 as uuid} from 'uuid'
import TrackingLine from '../models/TrackingLine';
import TrackingLineRow from '../components/TrackingLineRow.vue';
import Modal from '../components/Modal.vue'

/** @type {import('vue').Ref<TrackingLine>} */
const toInsert = ref(new TrackingLine({}))
/** @type {import('vue').Ref<TrackingLine[]>} */
const trackingLines = ref([])
const addModal = ref()
onMounted(() => {
  const lsTrackingLines = localStorage.getItem("trackingLines");
  trackingLines.value = lsTrackingLines && lsTrackingLines !== 'undefined' ? JSON.parse(lsTrackingLines) : [];
})

const addTrackingLine = async () => {
  addModal.value.open().subscribe((res) => {
    if (!res) {
      toInsert.value = new TrackingLine({});
      return;
    } 
    
    if (!toInsert.value.submissionDate) {
      toInsert.value.submissionDate = null; // Mettre à null si le champ est vide
    }

    if (!toInsert.value.relaunchDate) {
      toInsert.value.relaunchDate = null; // Mettre à null si le champ est vide
    }
    
    toInsert.value.id = uuid();
    trackingLines.value.push(toInsert.value);
    toInsert.value = new TrackingLine({});
    localStorage.setItem("trackingLines", JSON.stringify(trackingLines.value));
  });
};

const deleteTrackingLine = async (id) => {
  trackingLines.value = trackingLines.value?.filter(f => f.id !== id);
  localStorage.setItem("trackingLines", JSON.stringify(trackingLines.value));
};
</script>

<style scoped lang="scss">
h1{
  color: #000;
}
#logo{
  align-self: center;
  margin: 30px auto;
  display: flex;
}
.form-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1000px;
    margin: 80px auto;
    padding: 30px;

}
.table-container {
  width: 100%;
  margin: 20px 0;
  background-color: #ffffffa5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: auto;
}

.header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  @media screen and (max-width:500px) {
    flex-direction: column;
    
  }
}

</style>