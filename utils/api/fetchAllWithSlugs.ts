interface Response {
    fields: {
        [slug: string]: string;
    };
}

const fetchAllWithSlugs = async (): Promise<Array<string>> => {
    const url = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID}/entries?content_type=blogPost&select=fields.slug`;
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
        },
    });
    const data = await res.json();
    const slug: string[] = data?.items?.map((item: Response) => {
        return item.fields.slug;
    });
    return slug;
};

export default fetchAllWithSlugs;
