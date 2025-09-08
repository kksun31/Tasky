import { OrganizationList } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
    return (
        <OrganizationList 
            hidePersonal
            afterSelectOrganizationUrl='/platform/dashboard/organization/organisation:id'
            afterCreateOrganizationUrl='platform/dashboard/organization/organisation:id'
        />
    );
};