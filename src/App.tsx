import useForm from "hooks/useForm";

export default function App() {
  const { onSubmit, register } = useForm();

  console.log("rerender");

  return (
    <form onSubmit={onSubmit}>
      <input type="text" {...register("test")} />
      <button type="submit">Submit</button>
    </form>
  );
}
