import * as Yup from 'yup';


export const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
          "Must Contain 8 Characters. At least ,one Uppercase, one Lowercase and one Number"
        ),
    confirmPassword: Yup.string()
        .required("Password confirmation is required")
        .oneOf(
            [Yup.ref("password"), null],
            "The confirmation password does not match"
        )
});