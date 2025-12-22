"use client";

import { toast } from "sonner";
import { ElementRef, useState, useRef } from "react";
import { Board } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { updateBoard } from "@/actions/update-board";
import { useAction } from "@/hooks/use-action";


interface BoardTitleFormProps {
    data: Board;
};

export const BoardTitleForm = ({
    data,
}: BoardTitleFormProps) => {
    const { execute } = useAction(updateBoard, {
        onSuccess: (data) => {
            toast.success(`Название доски теперь "${data.title}"!`);
            setTitle(data.title);
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const [title, setTitle] = useState(data.title);
    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
          inputRef.current?.focus();
          inputRef.current?.select();
        })
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const onSubmit = async (formData: FormData) => {
        const title = (formData.get("title") as string)?.trim();
        
        if (!title) {
            toast.error("Название обязательно.");
            return;
        }

        if (title.length < 3) {
            toast.error("Название должно быть не короче 3 символов.");
            return;
        }
        execute({
            title,
            id: data.id,
        });
    };

    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    if (isEditing) {
    return (
        <form
        ref={formRef}
        className="flex items-center gap-x-2"
        onSubmit={(e) => {e.preventDefault();
            const formData = new FormData(e.currentTarget);
            onSubmit(formData);
        }} // защита от обычного сабмита
        
        >
        <FormInput
            ref={inputRef}
            id="title"
            name="title"
            onBlur={onBlur}
            defaultValue={title}
            className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
        </form>
    );
    }

    return (
        <Button
            onClick={enableEditing}
            variant="transparent"
            className="font-bold text-lg h-auto w-auto p-1 px-2"
        >
            {title}
        </Button>
    );
};