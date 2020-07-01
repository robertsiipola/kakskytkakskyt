import Layout from '../components/Layout';
import React from 'react';
import Title from '../components/Title';
import useContentful from '../utils/hooks/useContentful';
import ReactMarkdown from 'react-markdown';

const IndexPage: React.FC<Record<never, never>> = () => {
    const [data, loading, error] = useContentful();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error</div>;
    return (
        <Layout title="Home | KakskytKakskyt">
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
