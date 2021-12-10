import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await new MongoClient(global.__MONGO_URI__)
    await this.client.connect()
  },
  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
