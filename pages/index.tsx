import Layout from '../components/Layout';
import React, { MouseEvent } from 'react';
import Title from '../components/Title';
import useContentful from '../utils/hooks/useContentful';
import ReactMarkdown from 'react-markdown';

const IndexPage: React.SFC<> = () => {
    const [data, loading, error] = useContentful(process.env.NEXT_PUBLIC_MANIFEST_ID);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <Title></Title>
            <div>
                {data && (
                    <>
                        <h2>{data.title}</h2>
                        <ReactMarkdown source={data.body} />
                    </>
                )}
            </div>
        </Layout>
    );
};

export default IndexPage;
