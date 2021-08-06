import { useEffect, useState } from "react";
import validator from 'validator';

const useValidation = (fields) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(true);
    for(const field in fields) {
      if (field === 'email' && !validator.isEmail(fields[field])) {
        setIsValid(false);
      } else if (field !== 'email') {
        const el = document.querySelector(`#${field}`)
        if (el) {
          if (el.minLength && fields[field].length < el.minLength) setIsValid(false);
          if (el.maxLength && fields[field].length > el.maxLength) setIsValid(false);
          if (el.pattern && fields[field].length > 0) {
            const regexp = new RegExp(el.pattern);
            if (!regexp.test(fields[field])) setIsValid(false);
          }
        }
      }
    }
  }, [fields] );

  return isValid;
}

export default useValidation;