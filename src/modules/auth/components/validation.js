import * as Yup from 'yup';


export const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("This field is required"),
    lastName: Yup.string()
        .required("This field is required"),
    email: Yup.string()
        .email("Invalid email")
        .required("This field is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must contain both characters, numbers and be greater than 8 characters"),
    confirmPassword: Yup.string()
        .required("Password confirmation is required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          )
        .oneOf(
            [Yup.ref("password"), null],
            "The confirmation password does not match"
        ),
    acceptTerms: Yup.bool().oneOf([true], "Don't forget to accept to the terms"),
});