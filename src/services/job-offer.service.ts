import type { Job } from '../interfaces';
import { MOCK_JOBS } from '../mock';
import { getJobs } from './api.service';

class JobOfferService {
    static async getJobOffers(_page = '1'): Promise<{ member: Job[] }> {
        try {
            const response = await getJobs();
            
            if (response.error || !response.data) {
                return {
                    member: MOCK_JOBS,
                };
            }

            const jobs = Array.isArray(response.data) 
                ? (response.data as unknown as Job[])
                : (response.data as { member?: Job[] })?.member || [];

            return {
                member: jobs.length > 0 ? jobs : MOCK_JOBS,
            };
        } catch (error) {
            return {
                member: MOCK_JOBS,
            };
        }
    }
}

export default JobOfferService;

