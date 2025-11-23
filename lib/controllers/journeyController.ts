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

export async function getJourney(journeyId:number): Promise<any> {
    if (journeys) 
        return journeys.find(j => j.id === journeyId);
    //console.log("Fetching from back-end"); // Debugging line
    journeys = await restClient<any[]>("/journeys");
    return journeys.find(j => j.id === journeyId);
}
 