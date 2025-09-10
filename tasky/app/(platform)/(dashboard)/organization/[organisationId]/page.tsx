import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const OrganizationIdPage = async () => {
    const { userId, orgId } = await auth();
    return (
        <div>
          пользовательская страница
        </div>
    );
};

export default OrganizationIdPage;
