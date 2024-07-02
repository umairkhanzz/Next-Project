"use client"
import { useRouter } from 'next/navigation';
import { useAppDispatch } from './store';
import { login } from './store/slices/authSlice';

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
      dispatch(login());
      router.push('/dashboard');
  };
  return (
    <>
            
    <div className="flex items-center justify-center h-screen">
        <div>
        <p className='text-3xl font-semibold mb-8 '>Please press the login button </p>
        <div className='flex justify-center'>
        <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded"
        >
            Login
        </button>
        </div>
        </div>
    </div>
</>
  );
}
