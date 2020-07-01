import Layout from '../components/Layout';
import React from 'react';
import Title from '../components/Title';
import useContentful from '../utils/hooks/useContentful';
import ReactMarkdown from 'react-markdown';
import styles from '../styles/index.module.css';

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
                        <h2 className={styles.title}>{data.title}</h2>
                        <div>
                            <ReactMarkdown source={data.body} />
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default IndexPage;
