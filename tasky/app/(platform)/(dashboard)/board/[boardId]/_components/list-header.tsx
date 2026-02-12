"use clinet";

export const ListHeader = () => {
    return (
        <div>
            sldf;ladl;s
        </div>
    )
}

/*export const ListHeader = ({ data }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Переименовано в "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    }
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({ title, id, boardId });
  };

  // ... логика enableEditing и disableEditing
}*/