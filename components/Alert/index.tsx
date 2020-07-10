import React from 'react';

interface AlertProps {
    preview: boolean;
}

const Alert: React.FC<AlertProps> = ({ preview }) => {
    if (preview)
        return (
            <div>
                This is page is a preview.{' '}
                <a href="/api/exit-preview" className="underline hover:text-cyan duration-200 transition-colors">
                    Click here
                </a>{' '}
                to exit preview mode.
            </div>
        );
    else return <div></div>;
};

export default Alert;
