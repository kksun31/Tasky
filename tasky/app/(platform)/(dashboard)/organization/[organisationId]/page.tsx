import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


// ✅ Создай интерфейс для параметров
interface PageProps {
  params: {
    organisationId: string;
  };
}

// ✅ Укажи тип параметров в функции
export default async function OrganizationIdPage({ params }: PageProps) {
  const { userId, orgId } = await auth();

  return (
    <div>
      <h1>Организация: {params.organisationId}</h1>  ← ✅ Теперь TypeScript доволен!
      <p>Здесь будут доски.</p>
    </div>
  );
}
/*const OrganizationIdPage = () => {
    const { userId, orgId } = auth();
    return (
        <div>
            <OrganizationSwitcher />
        </div>
    );
};

export default  OrganizationIdPage;

*/