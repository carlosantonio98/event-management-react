import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});  // La idea de este formValidation es que me diga a mi claramente si hay un error o no hay un error, usamos un useState porque necesitamos redibujar el formulario si llega a ocurrir algun error, siempre que queramos redibujar una parte del html el componente debe de actualizar el estado para que este en automatico redibuje el componente completo. Cuando estamos hablande de realizar cambios en el html que requieran renderizarse nuevamente tenemos que usar un tipo de hook que maneje el estado.

    useEffect(() => {
      createValidators();
    }, [ formState ]) // Cada que cambie el formState se ejecutara el createValidators().
    
    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ]);  // si el formulario incial cambia, actualiza el estado del formulario

    const isFormValid = useMemo( () => {  // Usamos el useMemo para memorizar este valor, y solo se vuelva a reprocesar solo si el formValidation cambia, esto con la finalidad de que no se vuelva a reprocesar o ejecutar esto cuando yo llame a una función que no tiene nada que ver con el formValidation o queramos llamar una función de otro estado que no necesariamente toca el formValidation. Esto es una BUENA PRACTICA.

        for (const formValue of Object.keys( formValidation )) {
           if ( formValidation[formValue] != null ) return false;
        }

        return true;
    }, [ formValidation ]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[ formField ];

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}