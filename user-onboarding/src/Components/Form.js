import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const NewUser = ({values, errors, touched, status}) => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        if (status) {
            setUser([...user, status])
        }
    }, [status]);

    return(
        <div>

        <Form>

            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (<p>{errors.name}</p>)}

            <Field type="text" name="email" placeholder="Email" />
            {touched.email && errors.email && (<p>{errors.email}</p>)}

            <Field type="text" name="password" placeholder="Password" />
            {touched.password && errors.password && (<p>{errors.password}</p>)}

            <label>Agree to Terms of Service: <Field type="checkbox" name="terms" checked={values.terms} /> </label> 
            {touched.terms && errors.terms && (<p>{errors.terms}</p>)}

            <button>Submit</button>

        </Form>

        {user.map(person => (
            <ul key={person.id}>
                <li>Name: {person.name}</li>
                <li>Email: {person.email}</li>
                <li>Password: {person.password}</li>
            </ul>
        ))}

        </div>
    )}


const FormikNewUser = withFormik ({
    mapPropsToValues({name, email, password, terms}){
        return{
            name: name || "",
            email: name || "",
            password: password || "",
            terms: terms || false
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().min(2, "Name must have more than one character.").required("Required field"),
        email: Yup.string().email("Invalid Email.").required("Required field."),
        password: Yup.string().min(8, "Password must have at least 8 characters.").required("Required field."),
        terms: Yup.boolean().oneOf([true], "Must accept Terms of Service.").required("Required field.")

    }),

    handleSubmit(values, {setStatus}) {
        axios 
        
        .post("https://reqres.in/api/users/", values)
        .then(response => {
            console.log(response);
            setStatus(response.data);
        })

        .catch(error => console.log(error.response));
    }
})(NewUser)

export default FormikNewUser;