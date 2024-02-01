import { useState } from 'react';

const useForm = (defaultFormState = {}) => {
  const [formState, setFormState] = useState(defaultFormState);

  // Handler for formData changes
  const handleChange = (event) => {
    const { name, value, files } = event.target;

    const newFormState = { ...formState };
    newFormState[name] = value;

    // differentiating photo-field
    if (name === 'photo') {
      newFormState.photo = files[0];
    }

    setFormState(newFormState);
  };

  return { formState, handleChange, setFormState };
};

export default useForm;