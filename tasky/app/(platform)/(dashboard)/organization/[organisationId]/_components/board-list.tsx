import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";

export const BoardList = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="h-6 w-6 mr-2"/>
                Ваши доски
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <FormPopover sideOffset={10} side="right">
                    <div
                        role="button"
                        className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col items-center justify-center gap-y-1 hover:opacity-75 transition"
                    >
                        <p className="text-sm text-center">Создать новую доску</p>
                        <span className="text-xs text-center">
                            Осталось доступных досок: 5
                        </span>
                        <Hint
                            sideOffset={40}
                            description={`
                                В бесплатных рабочих пространствах может быть до 5 открытых досок. Для получения неограниченного количества досок обновите рабочее пространство.
                            `}
                        >
                            <HelpCircle 
                                className="absolute bottom-2 right-2 h-[12px] w-[14px]"
                            />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    );
};