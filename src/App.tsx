import useForm from "hooks/useForm";

export default function App() {
  const { onSubmit, register } = useForm();

  console.log("rerender");

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={(e) => onSubmit(e, handleSubmit)}>
      <input type="text" {...register("test1", "default value here")} />
      <input type="text" {...register("test2")} />
      <button type="submit">Submit</button>
    </form>
  );
}
