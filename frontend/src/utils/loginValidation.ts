const validateEmail = (email: string): boolean => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password: string): boolean => password.length >= 5;

const validateConfirmPassword = (
  password: string,
  confirmPassword: string | undefined
): boolean => password === confirmPassword;

const validateName = (name: string): boolean => name.length > 0;

export { validateEmail, validatePassword, validateConfirmPassword, validateName };
