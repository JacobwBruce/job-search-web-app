export interface JobType {
    adref: string;
    category: { tag: string; label: string; __CLASS__: string };
    company: { display_name: string; __CLASS__: string };
    created: string;
    description: string;
    id: string;
    latitude: number;
    location: { display_name: string; area: Array<string>; __CLASS__: string };
    longitude: number;
    redirect_url: string;
    salary_is_predicted: string;
    title: string;
    status?: string;
    __CLASS__: string;
}
