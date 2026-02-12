import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
  params: Promise<{
    boardId: string;
  }>;
};

const BoardIdPage = async ({
  params,
}: BoardIdPageProps) => {
  // 1. ВОТ ЭТА СТРОЧКА — САМАЯ ВАЖНАЯ! Мы ждем параметры.
  const { boardId } = await params;
  
  const { orgId } = await auth();

  if (!orgId) {
    redirect("/select-org");
  }

  // 2. Теперь используем уже готовую переменную boardId (без params.)
  const lists = await db.list.findMany({
    where: {
      boardId: boardId, // <-- Здесь исправили
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <ListContainer
        boardId={boardId} // <-- И здесь передаем чистый ID
        data={lists}
      />
    </div>
  );
};

export default BoardIdPage;