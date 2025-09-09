import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout = ({ 
    children 
}: { 
    children: React.ReactNode;
}) => {
    return (
        <div>
            {children}
        </div> 
    );
};

export default PlatformLayout;
