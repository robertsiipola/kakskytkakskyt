import { createClient } from 'contentful';
const client = createClient({
    space: <string>process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: <string>process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

interface Item {
    fields: {
        [slug: string]: string;
    };
    sys: unknown;
}

const fetchAllWithSlugs = async (): Promise<Array<string>> => {
    const entries = await client.getEntries({
        content_type: 'blogPost',
        select: 'fields.slug',
    });

    const slugs = entries.items.map((item) => {
        const typeSafeItem = item as Item;
        return typeSafeItem.fields.slug;
    });

    return slugs;
};

export default fetchAllWithSlugs;
