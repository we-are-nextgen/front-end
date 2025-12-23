// lib/postsService.ts
import { Console } from "console";
import { restClient } from "../services/restClient";
import "server-only";

let journeys: any[] | undefined;

export async function getJourneys(): Promise<any[]> {
    if (journeys) return journeys;
    console.log("Fetching from back-end"); // Debugging line
    journeys = await restClient<any[]>("/journeys");
    return journeys;
}

export async function getJourney(journeyId:string): Promise<any> {
    if (journeys) 
        return journeys.find(j => j.id === journeyId);
    journeys = await restClient<any[]>("/journeys");
    //console.log("================");
    //console.log(journeyId);
    //console.log(journeys);
    //console.log("================");
    return journeys.find(j => j.id === journeyId);
}
 