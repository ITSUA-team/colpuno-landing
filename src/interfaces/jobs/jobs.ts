export interface Job {
    id: number;
    '@id': string;
    title: string;
    employer: { title: string; logo: { contentUrl: string }; dmwNumber?: string };
    agency: { title: string; logo: { contentUrl: string }; dmwNumber?: string } | null;
    createdAt: string;
    startDate?: string;
    expirationDate: string;
    country: { name: string };
    region: { name: string };
    employerImg: string;
    published?: boolean;
    jobType?: string;
    description?: string;
    benefitsDescription: string;
    jobVideos: JobVideos[];
    jobImages: Media[];
    jobDocuments: Media[];
    skillTest: { uuid: string };
    enabledPersonalityTest: boolean;
    importId: string | null;
    jobFit: number;
    nurseFit: number;
    salary: {
        id: number;
        salaryPeriod: string;
        salaryLower: number;
        salaryHigher: number;
        currency: { id: number; code: string; name: string };
    };
    dmwNumber?: string;
    workplace?: string;
    numberOfVacancies?: number;
    yearsOfExperience?: number;
    maxGapInPractice?: number;
    isLeadershipRole?: boolean;
    degreeLevel?: string;
    isApplied?: boolean;
    isDuplicate?: boolean;
    internationalWorkEnvironment: string;
    jobTechnicalClinicalSkills: any[];
    experienceFacilityTypes: any[];
    jobShiftPatterns: any[];
    accommodationCapability: boolean;
    workloadIntensity: any;
    genderPreference: string;
    jobDuplicate?: {
        id: number;
        title: string;
        company: string;
        country: string;
        region: string;
    };
    jobRequiredLicences: [
        {
            '@id': string;
            id: number;
            licence: {
                '@id': string;
                id: number;
                name: string;
            };
        },
    ];
    jobRequiredCertificates: [
        {
            '@id': string;
            id: number;
            certificate: {
                '@id': string;
                id: number;
                name: string;
            };
        },
    ];
    jobOpeningLanguageCertificates: [
        {
            '@id': string;
            id: number;
            languageCertificate: {
                '@id': string;
                id: number;
                name: string;
            };
        },
    ];
    jobOpeningLanguages: [
        {
            '@id': string;
            id: number;
            language: {
                '@id': string;
                id: number;
                name: string;
            };
            languageProficiency: {
                '@id': string;
                id: number;
                title: string;
                description: string;
            };
        },
    ];
    jobOpeningPhysicalCapabilities: [
        {
            '@id': string;
            id: number;
            physicalCapability: {
                '@id': string;
                id: number;
                name: string;
            };
        },
    ];
    jobOpeningSpecializedPracticeAreas: [
        {
            '@id': string;
            id: number;
            specializedPracticeArea: {
                '@id': string;
                id: number;
                name: string;
            };
        },
    ];
    facilityTypeExperience?: {
        '@id': string;
        id: number;
        name: string;
    };
    jobBenefits?: [
        {
            benefitPriority: string;
        },
    ];
}

export interface JobVideos {
    id: number;
    description: string;
    link: string;
}

export interface Media {
    id: number;
    description: string;
    documents?: File[];
    images?: File[];
}

export interface File {
    uuid: string;
    size: number;
    originalName: string;
    mimeType: string;
    contentUrl: string;
}

