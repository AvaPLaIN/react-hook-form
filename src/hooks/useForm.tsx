import unset from "lodash/unset";
import { useRef } from "react";
import getEventValue from "utils/getEventValue";
import getUpdatedValues from "utils/getUpdatedValues";

//! Types
type Value = {
  value: string | number | boolean;
};

type FormValues = {
  [key: string]: Value | FormValues;
};

//! Hook
const useForm = () => {
  const values = useRef({});
  const registeredControls = useRef({});

  const handleUnsetValues = (id: string) => {
    const currentValues = structuredClone(values.current);
    unset(currentValues, id);
    return currentValues;
  };

  const handleFirstRegister = (id: string) => {
    registeredControls.current = getUpdatedValues(
      registeredControls.current,
      id,
      { value: true }
    );
  };

  const hasRegistered = (id: string) => {
    const currentValues = structuredClone(registeredControls.current);
    return !!currentValues[id]?.value;
  };

  const register = (id: string, defaultValue?: string) => {
    if (!hasRegistered(id)) {
      handleFirstRegister(id);
      values.current = getUpdatedValues(values.current, id, {
        value: defaultValue || "",
      });
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = getEventValue(event);
      values.current = getUpdatedValues(values.current, id, {
        value,
      });
    };

    return { onChange, defaultValue };
  };

  const unregister = (id: string) => {
    values.current = handleUnsetValues(id);
  };

  const getFormValues = () => values.current;

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement>
    // callback: (data: FormValues) => void
  ) => {
    event.preventDefault();
    const data = getFormValues();
    return data;
  };

  return { onSubmit, register, unregister, getFormValues };
};

export default useForm;
