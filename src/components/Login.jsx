import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

const schema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required()
        .matches(/.*@stud\.noroff\.no$/, 'Must be a stud.noroff.no email'),
    password: yup.string().min(8).required(),
});
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/login', data);
            console.log(response.data);
        } catch (error) {
            console.error(error.response);
        }
    };

    return (
        <form className="container mx-auto max-w-md mt-10" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold mb-5">Login</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block mb-1">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded"
                    {...register('email', { required: true, pattern: /.*@stud\.noroff\.no$/ })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-1">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded"
                    {...register('password', { required: true })}
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>
            <button type="submit" className="bg-blue-500 text-white p-3 rounded">
                Login
            </button>
        </form>
    );
};

export default Login;
