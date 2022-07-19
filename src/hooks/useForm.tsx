import set from "lodash/set";

//! Types
type Value = {
  value: string | number | boolean;
};

type FormValues = {
  [key: string]: Value | FormValues;
};

//! Hook
const useForm = () => {
  const formValues: FormValues = {};

  const register = (id: string, defaultValue?: string) => {
    set(formValues, id, { value: defaultValue || "" });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      set(formValues, id, { value: e.currentTarget.value });
    };

    return { onChange, defaultValue };
  };

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    callback: (data: FormValues) => void
  ) => {
    e.preventDefault();
    callback(formValues);
  };

  return { onSubmit, register };
};

export default useForm;
