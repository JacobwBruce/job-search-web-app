export interface JobType {
    adref: string;
    category: { tag: string; label: string };
    company: { display_name: string };
    created: string;
    description: string;
    id: string;
    latitude: number;
    location: { display_name: string; area: Array<string> };
    longitude: number;
    redirect_url: string;
    salary_is_predicted: string;
    title: string;
}
