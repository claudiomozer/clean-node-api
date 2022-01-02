import { Collection, MongoClient, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  url: null as unknown as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(this.uri)
  },

  async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.close()
    }
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (collection: any, id: ObjectId): any => {
    return Object.assign({}, collection, { id: id.toString() })
  }
}
