"use client";

import { Plus, X } from "lucide-react";
// 1. Убрали ElementRef из импорта
import { useState, useRef } from "react"; 

import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { ListWrapper } from "./list-wrapper";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const ListForm = () => {   
    const params = useParams();
    const router = useRouter();

    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    
    const [isEditing, setIsEditing] = useState(false);
    
    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();    
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const { execute, fieldErrors } = useAction(createList, {
        onSuccess: (data) => {
            toast.success(`Список "${data.title}" успешно создан!`); // Уведомление об успехе
            disableEditing(); // Закрываем форму
            router.refresh(); // Заставляем Next.js обновить данные на странице
        },
        onError: (error) => {
            toast.error(error); // Показываем ошибку, если что-то пошло не так
        },
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        };
    };

    useEventListener("keydown", onKeyDown);

    // 3. САМОЕ ВАЖНОЕ: добавляем "as" вот здесь 👇
    // Это говорит хуку: "Не волнуйся, эта форма — тоже HTMLElement"
    useOnClickOutside(formRef as React.RefObject<HTMLElement>, disableEditing);

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        execute({ title, boardId }); // Отправляем данные на сервер
    };


    if (isEditing) {
        return (
            <ListWrapper>
                <form
                    action={onSubmit}
                    ref={formRef}
                    className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
                >
                    <FormInput
                        id = "title"
                        errors={fieldErrors}
                        ref={inputRef}
                        className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
                        placeholder="Введите название списка..."
                    />
                    <input 
                        hidden 
                        defaultValue={params.boardId} 
                        name="boardId" 
                        />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>
                            Добавить список
                        </FormSubmit> 
                        <Button
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>  
                </form>
            </ListWrapper>
        );
    };

    return (
        <ListWrapper>
            <button
                onClick={enableEditing} // Добавил тебе обработчик, чтобы окно открывалось
                className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
            >
                <Plus className="h-4 w-4 mr-2"/>
                Добавить список
            </button>
        </ListWrapper>
    );
};