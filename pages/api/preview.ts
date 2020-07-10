import { NextApiRequest, NextApiResponse } from 'next';
import fetchPreviewWithSlug from '../../utils/api/fetchPreviewWithSlug';

export default async function preview(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { secret, slug } = req.query;

    if (secret !== process.env.NEXT_PUBLIC_CONTENTFUL_SECRET_TOKEN || !slug) {
        return res.status(401).json({ message: 'Invalid token', secret: secret, slug: slug });
    }

    const post = await fetchPreviewWithSlug(slug);

    if (!post) {
        return res.status(401).json({ message: 'Invalid slug' });
    }

    res.setPreviewData({});

    const url = `/blog/${post.slug}`;
    res.write(
        `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url}" />
    <script>window.location.href = '${url}'</script>
    </head>`,
    );
    res.end();
}
