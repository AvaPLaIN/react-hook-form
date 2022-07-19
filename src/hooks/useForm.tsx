import set from "lodash/set";

const useForm = () => {
  const formValues = {};

  const register = (id: string) => {
    set(formValues, id, { value: "" });

    const onChange = (e: any) => {
      set(formValues, id, { value: e.target.value });
    };

    return { onChange };
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(formValues);
    return formValues;
  };

  return { onSubmit, register };
};

export default useForm;
