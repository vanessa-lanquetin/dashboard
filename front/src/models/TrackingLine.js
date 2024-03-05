import api from '../helpers/Api'
import Contact from './Contact'

class TrackingLine {
  /**@param {Partial<TrackingLine>} trackingLine */
  constructor(trackingLine) {
    /** @type {string | undefined}*/
    this._id = trackingLine._id
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

  /** @returns {Promise<TrackingLine[]>}*/
  static async all() {
    let { data: _trackinglines } = await api.get('/v1/trackingline')
    if (!_trackinglines) _trackinglines = []
    return _trackinglines.map((t) => new TrackingLine(t))
  }
  /** @returns {Promise<TrackingLine>}*/
  static async get(_id) {
    let { data: _trackingline } = await api.get(`/v1/trackingline/${_id}`)
    return _trackingline ? new TrackingLine(_trackingline) : null
  }
  /** @returns {Promise<TrackingLine>}*/
  static async create(trackingline) {
    let { data: _trackingline } = await api.post(`/v1/trackingline/`, trackingline)
    return _trackingline ? new TrackingLine(_trackingline) : null
  }
  /** @returns {Promise<TrackingLine>}*/
  static async update(_id, trackingline) {
    let { data: _trackingline } = await api.put(`/v1/trackingline/${_id}`, trackingline)
    return _trackingline ? new TrackingLine(_trackingline) : null
  }
  /** @returns {Promise<TrackingLine>}*/
  static async delete(_id) {
    await api.delete(`/v1/trackingline/${_id}`)
    return 'ok';
  }

  async save() {
    if(this._id) {
      return TrackingLine.update(this._id, this)
    } else {
      return TrackingLine.create(this)
    }
  }
}
export default TrackingLine