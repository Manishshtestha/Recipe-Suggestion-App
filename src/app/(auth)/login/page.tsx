'use client';
import { useState, useEffect, useRef } from 'react';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const containerRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Add your registration logic here
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const maxRotation = 15;

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;

            const rotateX = (y / height) * maxRotation;
            const rotateY = (x / width) * maxRotation;

            container.style.transform = `perspective(600px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseLeave = () => {
            if (container) {
                container.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
            }
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div
                ref={containerRef}
                className="p-8 rounded w-full max-w-md bg-gradient-to-r from-cyan-400/30 via-blue-500/30 to-purple-600/30 shadow-[0_0_20px_2px_rgba(0,255,255,0.7),0_0_40px_10px_rgba(0,0,255,0.5)] backdrop-blur-md border border-cyan-400/50 transition-transform duration-300"
                style={{
                    boxShadow: '0 0 20px 2px rgba(0,255,255,0.7), 0 0 40px 10px rgba(0,0,255,0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(0,255,255,0.3)',
                }}
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-[0_0_5px_cyan]">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-cyan-400 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-transparent text-white placeholder-cyan-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-cyan-400 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-transparent text-white placeholder-cyan-300"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-cyan-400 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm bg-transparent text-white placeholder-cyan-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
