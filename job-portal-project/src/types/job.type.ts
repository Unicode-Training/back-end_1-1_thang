export type JobUpdateData = {
    addressId?: number;
    levelId: number;
    expId: number;
    quantity: number;
    name: string;
    description: string;
    requirement: string;
    interests: number[];
    skills: number[];
    salaryId: number;
    expire: Date;
}

export type JobPublicQuery = {
    page: number;
    limit: number;
    q: string;
    sort: string;
    order: 'desc' | 'asc',
    industryId: string;
    skillId: string;
    expId: string;
    workId: string;
    salaryId: string;
    provinceId: number;
}