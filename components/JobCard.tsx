import Link from 'next/link';
import React from 'react';

interface JobCardProps {
    id?: string;
    title: string;
    location: string;
    contractType: string;
    salary: string;
}

export default function JobCard({ id, title, location, contractType, salary }: JobCardProps) {
    return (
        <article className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4 transition-shadow hover:shadow-md">
            <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-2">
                    {contractType}
                </span>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                    📍 {location}
                </p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-2">
                <span className="text-gray-700 font-medium">
                    {salary}
                </span>
                <Link
                    href={`/offres/${id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors active:scale-95"
                >
                    Voir l'offre
                </Link>
            </div>
        </article>
    );
}