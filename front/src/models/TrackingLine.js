import Contact from './Contact'

class TrackingLine {
  /**@param {Partial<TrackingLine>} trackingLine */
  constructor(trackingLine) {
    /** @type {string | undefined}*/
    this.id = trackingLine.id
    /** @type {string | undefined}*/
    this.enterpriseName = trackingLine.enterpriseName
    /** @type {string | undefined}*/
    this.submissionDate = trackingLine.submissionDate
    /** @type {'offer' | 'spontaneous-candidacy' | undefined}*/
    this.type = trackingLine.type || 'offer'
    /** @type {string | undefined}*/
    this.jobName = trackingLine.jobName
    /** @type {import('./Contact').default[]}*/
    this.contacts = trackingLine.contacts?.map((contact) => new Contact(contact || {})) || []
    /** @type {string | undefined}*/
    this.infos = trackingLine.infos
    /** @type {string | undefined}*/
    this.relaunchDate = trackingLine.relaunchDate
    /** @type {{link: string,icon:string, name: string}[]}*/
    this.links = trackingLine.links || []
  }
}
export default TrackingLine