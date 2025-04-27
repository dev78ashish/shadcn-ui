import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl px-4">
                <header className="flex justify-between items-center py-6">
                    <div className="flex items-center space-x-2">
                        <div className="bg-primary rounded-full w-8 h-8"></div>
                        <span className="font-bold text-xl text-slate-800">My App</span>
                    </div>
                    <nav className="flex items-center space-x-4">
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Button variant="default" asChild><Link to='/signup'>Signup</Link></Button>
                    </nav>
                </header>

                <main className="py-20">
                    <div className="max-w-2xl mx-auto text-center space-y-8">
                        <h1 className="text-5xl font-bold text-slate-900">Welcome to Our Platform</h1>
                        <p className="text-xl text-slate-600">
                            A simple and elegant solution for all your needs. Get started today and experience the difference.
                        </p>
                        <div className="flex justify-center gap-4 pt-6">
                            <Button size="lg" variant="default">Get Started</Button>
                            <Button size="lg" variant="outline">Learn More</Button>
                        </div>
                    </div>
                </main>

                <footer className="py-10 text-center text-slate-500">
                    <p>© 2025 MyApp. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}