const Alert: React.FC<AlertProps> = ({ type, title, message, icon, className = "", renderContent, }) => {
    const alertClasses = {
        warning: 'border-warning bg-warning bg-opacity-15 text-[#9D5425]',
        success: 'border-[#34D399] bg-[#34D399] bg-opacity-15 text-black',
        error: 'border-[#F87171] bg-[#F87171] bg-opacity-15 text-[#B45454]',
    };

    return (
        <div className={`flex w-full border-l-6 px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9 ${alertClasses[type]} ${className}`}>
            <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg">
                {icon && <div className="mr-3">{icon}</div>}
            </div>
            <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold">{title}</h5>
                <p className="leading-relaxed">{message}</p>
            </div>
            {renderContent && renderContent()}
        </div>
    );
};

export default Alert;