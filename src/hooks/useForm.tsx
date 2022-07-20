import set from "lodash/set";
import unset from "lodash/unset";
import { useRef } from "react";
import getEventValue from "utils/getEventValue";

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
  const firstRun = useRef({});

  const handleSetValues = (id: string, object: any) => {
    const currentValues = structuredClone(values.current);
    set(currentValues, id, object);
    return currentValues;
  };

  const handleUnsetValues = (id: string) => {
    const currentValues = structuredClone(values.current);
    unset(currentValues, id);
    return currentValues;
  };

  const handleFirstRegister = (id: string) => {
    firstRun.current = handleSetValues(id, { value: true });
  };

  const hasRegistered = (id: string) => {
    const currentValues = structuredClone(firstRun.current);
    return !!currentValues[id]?.value;
  };

  const register = (id: string, defaultValue?: string) => {
    if (!hasRegistered(id)) {
      handleFirstRegister(id);
      values.current = handleSetValues(id, { value: defaultValue || "" });
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = getEventValue(event);
      values.current = handleSetValues(id, { value });
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
