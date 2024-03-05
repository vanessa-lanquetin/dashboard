const { mongo } = require('../helpers/mongo')
const Contact = require('./Contact')

class TrackingLine {
  /**@param {Partial<TrackingLine>} trackingLine */
  constructor(trackingLine) {
    /** @type {import('mongodb').ObjectId | undefined | null | string | number}*/
    this._id = trackingLine._id ? mongo.getID(trackingLine._id) : undefined;
    /** @type {string | undefined}*/
    this.enterpriseName = trackingLine.enterpriseName;
    /** @type {string | undefined}*/
    this.submissionDate = trackingLine.submissionDate;
    /** @type {'offer' | 'spontaneous-candidacy' | undefined}*/
    this.type = trackingLine.type || "offer";
    /** @type {string | undefined}*/
    this.jobName = trackingLine.jobName;
    /** @type {import('./Contact')[]}*/
    this.contacts =
      trackingLine.contacts?.map((contact) => new Contact(contact || {})) || [];
    /** @type {string | undefined}*/
    this.infos = trackingLine.infos;
    /** @type {string | undefined}*/
    this.relaunchDate = trackingLine.relaunchDate;
    /** @type {import('mongodb').ObjectId | undefined | null | string | number}*/
    this.ownerId = trackingLine.ownerId
      ? mongo.getID(trackingLine.ownerId)
      : null;
    /** @type {{link: string,icon:string, name: string}[]}*/
    this.links = trackingLine.links || [];
  }

  static async find(search) {
    let trackinglines = await mongo
      .collection("trackinglines")
      .find(search)
      .toArray();
    if (!trackinglines) trackinglines = [];
    return trackinglines.map((t) => new TrackingLine(t));
  }

  static async findOne(search) {
    let trackingline = await mongo.collection("trackinglines").findOne(search);
    return trackingline ? new TrackingLine(trackingline) : null;
  }

  static async createOne(_trackingline) {
    if (_trackingline._id) delete _trackingline._id;
    const trackingline = new TrackingLine(_trackingline);
    await trackingline.save();
    return trackingline
  }

  static async updateOne(search) {
    const trackingline = new TrackingLine(search);
    await trackingline.save();
    return trackingline;
  }

  async delete() {
    await mongo.collection("trackinglines").deleteOne({ _id: mongo.getID(this._id) });
  }

  async save() {
    if (this._id) {
      await mongo.collection("trackinglines").updateOne(
        {
          _id: mongo.getID(this._id),
        },
        {
          $set: {
            enterpriseName: this.enterpriseName,
            submissionDate: this.submissionDate,
            type: this.type,
            jobName: this.jobName,
            contacts: this.contacts,
            infos: this.infos,
            relaunchDate: this.relaunchDate,
            ownerId: this.ownerId,
            links: this.links,
          }
        }
      );
    } else {
      await mongo.collection("trackinglines").insertOne({
        enterpriseName: this.enterpriseName,
        submissionDate: this.submissionDate,
        type: this.type,
        jobName: this.jobName,
        contacts: this.contacts,
        infos: this.infos,
        relaunchDate: this.relaunchDate,
        ownerId: this.ownerId,
        links: this.links,
      });
    }
    return this
  }
}
module.exports = TrackingLine