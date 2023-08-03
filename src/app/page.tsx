import Image from 'next/image'
import Airtable from "airtable"
import LearningProjectCard from "../components/LearningProjectCard"

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

async function getData() {
    try {
      const records = await base('LearningProjects').select().all();
      console.log(JSON.stringify(records, null, 4))
      return records;
    } catch (error) {
      throw new Error('Failed to fetch data from Airtable');
    }
}

export default async function Home() {
  const theDataImWaitingFor = await getData()
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <h1 className="col-span-full text-center text-2xl font-bold mb-4">Marlon's App</h1>
      {theDataImWaitingFor.map(record => {
        return (
          <div key={record.id} className="col-span-1">
            <LearningProjectCard record={record} />
          </div>
        )
      })}
      
      <pre>{JSON.stringify(theDataImWaitingFor[0], null, 4)}</pre>
    </div>
  )
}
