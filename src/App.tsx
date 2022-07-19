import useForm from "hooks/useForm";

export default function App() {
  const { onSubmit, register, unregister } = useForm();

  console.log("rerender");

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  const handleUnregisterInput = () => {
    unregister("test1");
  };

  return (
    <form onSubmit={(e) => onSubmit(e, handleSubmit)}>
      <button type="button" onClick={handleUnregisterInput}>
        Unregister Input
      </button>

      <input type="text" {...register("test1", "default value here")} />
      <input type="text" {...register("test2")} />
      <button type="submit">Submit</button>
    </form>
  );
}
