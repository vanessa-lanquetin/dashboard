<template>
  <div class="tracking-line-root" v-if="trackingLine">
    <div class="header">
      <h1>
        <button class="back" @click="$router.back()">
          <i class="fas fa-chevron-left"></i>
        </button>
        Suivi de 
        <template v-if="!isEditMode">{{ trackingLine.enterpriseName }}</template>
        <template v-else><input v-model="toUpdate.enterpriseName"></template>
      </h1>
      <div class="actions">
        <button v-if="!isEditMode" @click="openEditMode"><i class="fas fa-edit"></i></button>
        <template v-if="isEditMode">
          <button @click="closeWithSave"><i class="fas fa-save"></i></button>
          <button @click="closeWithoutSave"><i class="fas fa-times"></i></button>
        </template>
      </div>
    </div>
    <div class="line">
      <div class="column">
        <section>
          <h2>Informations générales</h2>
          <ul>
            <li>
              <div>Type :</div>
              <template v-if="!isEditMode">{{ getTranslation(trackingLine.type) }}</template>
              <template v-else>
                <select id="application-type" v-model="toUpdate.type">
                  <option value="offer">Offre</option>
                  <option value="spontaneous-candidacy">Candidature spontanée</option>
                </select>
              </template>
            </li>
            <li>
              <div>Date d'envoi de candidature :</div>
              <template v-if="!isEditMode">{{ date(trackingLine.submissionDate) }}</template>
              <template v-else><input type="date" v-model="toUpdate.submissionDate"></template>
            </li>
            <li>
              <div>Nom du poste :</div>
              <template v-if="!isEditMode">{{ trackingLine.jobName }}</template>
              <template v-else><input v-model="toUpdate.jobName"></template>
            </li>
            <li>
              <div>Date de relance :</div>
              <template v-if="!isEditMode">{{ date(trackingLine.relaunchDate) }}</template>
              <template v-else><input type="date" v-model="toUpdate.relaunchDate"></template>
            </li>
          </ul>
        </section>
        <section>
          <h2>Liens
            <button v-if="isEditMode" @click="toUpdate.links.push({icon: 'globe', link: ''})"><i class="fas fa-plus" ></i></button>
          </h2>
          <template v-if="!isEditMode">
            <ul  v-if="trackingLine.links?.length">
              <li class="link-container" v-for="(link, i) of trackingLine.links" :key="`links-${i}`">
                <i :class="icon(link.icon)"></i>
                <a :href="link.link" target="_blank">{{ link.name }}</a>
              </li>
            </ul>
            <div v-else>Aucun liens de renseigner</div>
          </template>
          <template v-else>
            <div v-for="(link, i) of toUpdate.links" :key="`link-${i}`">
              <select v-model="toUpdate.links[i].icon">
                <option value="globe">Lien</option>
                <option value="linkedin">Linkedin</option>
                <option value="github">Github</option>
              </select>
              <input type="text" placeholder="link..." v-model="toUpdate.links[i].link">
              <input type="text" placeholder="name..." v-model="toUpdate.links[i].name">
              <button @click="toUpdate.links.splice(i, 1)"><i class="fas fa-times" ></i></button>
            </div>
          </template>
        </section>
        <section>
          <h2>Contact
            <button v-if="isEditMode" @click="toUpdate.contacts.push(new Contact({}))">
              <i class="fas fa-plus" ></i>
            </button>
          </h2>
          <template v-if="!isEditMode">
            <ul  v-if="trackingLine.contacts?.length">
              <li class="contact-container" v-for="(contact, i) of trackingLine.contacts" :key="`contacts-${i}`">
                <div class="contact-info">{{ contact.name }} - {{ contact.email }}</div>
                <div class="contact-phones">{{ contact.phones?.join(' - ') || 'Aucun numéros' }}</div>
              </li>
            </ul>
            <div v-else>Aucun contact de renseigner</div>
          </template>
          <template v-else>
            <ul class="contact-container" v-for="(contact, i) of toUpdate.contacts" :key="`contacts-${i}`">
              <li>
                <div>Nom :</div>
                <input type="text" placeholder="Nom..." v-model="toUpdate.contacts[i].name">
              </li>
              <li>
                <div>Email :</div>
                <input type="text" placeholder="Email..." v-model="toUpdate.contacts[i].email">
              </li>
              <li>
                <div>Telephones :</div>
                <ul class="contact-container" v-for="(phone, j) of toUpdate.contacts[i].phones" :key="`phone-${j}`">
                  <li class="line">
                    <input type="text" placeholder="Numéro..." v-model="toUpdate.contacts[i].phones[j]">
                    <button @click="toUpdate.contacts[i].phones.splice(j, 1)"><i class="fas fa-times" ></i></button>
                  </li>
                </ul>
                <button @click="toUpdate.contacts[i].phones.push('')"><i class="fas fa-plus" ></i></button>
              </li>
              <button @click="toUpdate.contacts.splice(i, 1)"><i class="fas fa-times" ></i></button>
            </ul>
          </template>
        </section>
      </div>
      <div class="information-container">
        <section>
          <h2>Informations</h2>
          <div v-if="!isEditMode" class="pre">
            <div class="markdown" v-if="trackingLine.infos">
              <Markdown :source="trackingLine.infos || ''"/>
            </div>
            <div v-else class="info-container">
              <i class="fas fa-info-circle"></i>
              <div>
                Aucune informations de disponible
              </div>
            </div>
          </div>
          <template v-else><textarea ref="textAreaRef" v-model="toUpdate.infos" @input="input"></textarea></template>
        </section>
      </div>
    </div>
    
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import {useRoute} from 'vue-router'
import TrackingLine from '../models/TrackingLine';
import Contact from '../models/Contact';
import Markdown from 'vue3-markdown-it'
import {date, getTranslation} from '../helpers/helper'

const route = useRoute()

/** @type {import('vue').Ref<import('../models/TrackingLine').default | undefined>} */
const trackingLine = ref()
/** @type {import('vue').Ref<import ('../models/TrackingLine').default>} */
const toUpdate = ref(new TrackingLine({}))

function reload() {
  const trackingLineId = route.params.trackingLineId 
  const lsTrackingLines = localStorage.getItem("trackingLines");
  const trackingLines = lsTrackingLines && lsTrackingLines !== 'undefined' ? JSON.parse(lsTrackingLines) : [];
  trackingLine.value = trackingLines.find(t => t.id === trackingLineId)
  toUpdate.value = new TrackingLine(trackingLine.value || {})
  console.log(trackingLine)
}
onMounted(() => reload())

const textAreaRef = ref()
function openEditMode() {
  isEditMode.value = true
  setTimeout(() => {
    input({target: textAreaRef.value})
  }, 50);
}
const isEditMode = ref(false)
function getTrackingLines () {
  const lsTrackingLines = localStorage.getItem("trackingLines");
  return lsTrackingLines && lsTrackingLines !== 'undefined' ? JSON.parse(lsTrackingLines) : [];
}
function closeWithSave() {
  isEditMode.value = false
  const trackingLines = getTrackingLines()
  const index = trackingLines.findIndex(t => t.id === trackingLine.value?.id)
  trackingLines?.splice(index, 1, toUpdate.value)
  localStorage.setItem("trackingLines", JSON.stringify(trackingLines));
  reload()
}

function closeWithoutSave() {
  toUpdate.value = new TrackingLine(trackingLine.value || {})
  isEditMode.value = false
}


/** @param {Event} ev */
async function input(ev) {
  if(ev.target) {
    /**@type {HTMLElement}*/(ev.target).style.height = 'calc(1em + 15px)';
    /**@type {HTMLElement}*/(ev.target).style.height = /**@type {HTMLElement}*/(ev.target).scrollHeight + 'px'
  }
}
function icon(key) {
  return {
    'globe': 'fas fa-globe',
    'linkedin': 'fab fa-linkedin',
    'github': 'fab fa-github',
  }[key] || key
}
</script>

<style scoped lang="scss">
.tracking-line-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1000px;
    margin: auto;
    padding: 20px 30px;
    box-sizing: border-box;
    gap: 10px;
    &>* {
      width: 100%;
    }
    .information-container {
      flex-grow: 1;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      h1 {
        display: flex;
        align-items: center;

      }
    }
    section {
      width: 100%;
      background-color: #fff;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.2);
      border-radius: 10px;
      padding: 10px;
      box-sizing: border-box;
    }
    
    .link-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .contact-container {
      display: flex;
      flex-direction: column;
      border-left: 1px solid black;
      padding: 0 10px;
      box-sizing: border-box;
      .contact-info {
        font-weight: bold;
      }
      .contact-phones {
        color: #555;
        font-size: 0.9em;

      }
    }
    .line {
      display: flex;
      gap: 10px;
    }

    .column {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .pre {
      white-space: pre-wrap;
    }
    .info-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      gap: 30px;
      padding: 30px;
      i {
        font-size: 3em;
      }
      div {
        color: #555;
      }
    }
}
.back {
  background-color: transparent;
  color: #555;
  font-size: 20px;
}
ul {
  padding: 0;
  li {
    list-style-type: none;
    margin: 20px 0;
  }
}
input,select,textarea {
  width: 100%;
}

h1, h2 {
  margin: 0;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  button {
    padding: 2px 5px;
    box-sizing: border-box;
  }
}

::v-deep(h1, h2) {
  margin: 0;
  text-align: left;
}
</style>