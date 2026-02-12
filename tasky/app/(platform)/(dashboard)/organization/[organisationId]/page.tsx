import { Suspense } from "react";
import { BoardList } from "./_components/board-list";
import { Info } from "./_components/info";
import { Separator } from "@/components/ui/separator";

interface OrganizationIdPageProps {
  params: Promise<{
    organizationId: string;
  }>;
};

const OrganizationIdPage = async ({
  params,
}: OrganizationIdPageProps) => {
  // 1. Обязательно ждем параметры здесь
  const { organizationId } = await params;

  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        {/* 2. Suspense покажет скелетон, пока BoardList грузит данные из базы */}
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;