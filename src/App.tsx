import useForm from "hooks/useForm";
import { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({});
  const { onSubmit, register, unregister, getFormValues } = useForm();

  const handleUnregisterInput = (id: string) => {
    unregister(id);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = onSubmit(event);
    setFormData(data);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <button type="button" onClick={() => handleUnregisterInput("test1")}>
        Unregister Input
      </button>

      <button type="button" onClick={() => console.log(getFormValues())}>
        get form values
      </button>

      <input type="text" {...register("test1", "default 1")} />
      <input type="text" {...register("test2", "default 2")} />
      <input type="checkbox" {...register("test3")} />
      <button type="submit">Submit</button>

      <pre>{JSON.stringify(formData, undefined, 2)}</pre>
    </form>
  );
}
