'use client';
import { useState, useEffect, useRef } from 'react';

const RegisterPage = () => {
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

        const maxRotation = 10; // Slightly reduced rotation for a more subtle effect

        const handleMouseMove = (e: MouseEvent) => {
            const { left, top, width, height } = container.getBoundingClientRect();
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;

            const rotateX = (y / height) * maxRotation;
            const rotateY = (x / width) * maxRotation;

            container.style.transform = `perspective(800px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        };

        const handleMouseLeave = () => {
            if (container) {
                container.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
            }
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            if (container) { // Ensure container exists before removing listeners
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center font-mono text-neutral-300 p-4">
            <div
                ref={containerRef}
                className="p-8 rounded-none w-full max-w-md bg-gradient-to-br from-neutral-900 via-black/90 to-neutral-900 shadow-[0_0_25px_3px_rgba(0,255,255,0.4),0_0_15px_1px_rgba(255,0,255,0.3)] backdrop-blur-sm border-2 border-cyan-500/50 transition-transform duration-300 ease-in-out"
            >
                <h1 className="text-3xl font-bold mb-8 text-center text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)] uppercase tracking-wider">
                    Initiate Registration
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-xs font-medium text-cyan-300 uppercase tracking-wider mb-1">
                            Operator Tag (Name)
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your designation"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2.5 border-2 border-neutral-700 rounded-none bg-black bg-opacity-60 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-200 ease-in-out font-mono text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xs font-medium text-cyan-300 uppercase tracking-wider mb-1">
                            Secure Uplink (Email)
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="your_id@domain.net"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2.5 border-2 border-neutral-700 rounded-none bg-black bg-opacity-60 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-200 ease-in-out font-mono text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-xs font-medium text-cyan-300 uppercase tracking-wider mb-1">
                            Access Key (Password)
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Min. 8 characters, alphanumeric"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2.5 border-2 border-neutral-700 rounded-none bg-black bg-opacity-60 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-200 ease-in-out font-mono text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pink-600 hover:bg-pink-500 text-neutral-100 font-semibold py-3 px-4 rounded-none focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-neutral-950 transition-all duration-200 ease-in-out uppercase tracking-wider border-2 border-pink-600 hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,0,255,0.5)] active:scale-[0.98]"
                    >
                        Register Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
