// actions/create-board/index.ts
"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { CreateBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    return { error: "Unauthorized" };
  }

  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName,
  ] = data.image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return { error: "Invalid image data" };
  }

   try {
    const board = await db.board.create({
      data: {
        title: data.title,
        orgId,

        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      },
      select: { id: true },
    });



    revalidatePath(`/organization/${orgId}`);

    return { data: { id: board.id } };
  } catch {
    return { error: "Failed to create board" };
  }
};

export const createBoard = createSafeAction(CreateBoard, handler);
