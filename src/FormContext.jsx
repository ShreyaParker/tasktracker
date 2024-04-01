import  { createContext, useState, useContext } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [openForm, setOpenForm] = useState(false);
    const [initialTask, setInitialTask] = useState(null);
    const [readOnly,setReadOnly] = useState(false);

    return (
        <FormContext.Provider value={{ openForm, setOpenForm , initialTask, readOnly,setReadOnly, setInitialTask }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    return useContext(FormContext);
};
