import { restClient } from "../services/restClient";
import "server-only";

let tracks: any[] | undefined;

export async function getTracks(domainId:number): Promise<any> {
    tracks = await restClient<any>(`/tracks/domain/${domainId}`);
    return tracks;
}


export async function getPaginatedTracks({ domainId, page , pageSize
}: {
  domainId: number;
  page?: number;
  pageSize?: number;
}): Promise<any> {
    console.log(`/tracks/domain/${domainId}/paginated?page=${page}&pageSize=${pageSize}`);
  const tracks = await restClient<any>(
    `/tracks/domain/${domainId}/paginated?page=${page}&pageSize=${pageSize}`
  );
  return tracks;
}
 

