// components/HowToWork.tsx
import React from 'react';
import { FaFileAlt, FaUserCheck, FaMoneyCheckAlt, FaGraduationCap } from 'react-icons/fa';

type Step = {
    number: number;
    title: string;
    description: string;
    icon: React.ElementType;
    color: 'blue' | 'green' | 'yellow' | 'purple';
};

export default function HowToWork() {
    const steps: Step[] = [
        {
            number: 1,
            title: 'Fill Online Application',
            description: 'Complete the online admission form with your personal and academic details.',
            icon: FaFileAlt,
            color: 'blue',
        },
        {
            number: 2,
            title: 'Document Verification',
            description: 'Upload required documents for verification by the admission team.',
            icon: FaUserCheck,
            color: 'green',
        },
        {
            number: 3,
            title: 'Pay Admission Fees',
            description: 'Securely pay the admission fees online through our payment gateway.',
            icon: FaMoneyCheckAlt,
            color: 'yellow',
        },
        {
            number: 4,
            title: 'Confirm Admission',
            description: 'Receive confirmation and start your journey as a university student.',
            icon: FaGraduationCap,
            color: 'purple',
        },
    ];

    const colorMap: Record<Step['color'], string> = {
        blue: 'bg-blue-400',
        green: 'bg-green-400',
        yellow: 'bg-yellow-400',
        purple: 'bg-purple-400',
    };

    const textColorMap: Record<Step['color'], string> = {
        blue: 'text-blue-400',
        green: 'text-green-400',
        yellow: 'text-yellow-400',
        purple: 'text-purple-400',
    };

    return (
        <section className="py-20 bg-blue-50 transition-colors">
            <div className="max-w-3xl mx-auto px-6">
                <h3 className="text-3xl font-bold mb-12 text-center text-slate-900">
                    How Online Admission Works
                </h3>
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-300"></div>

                    {steps.map((step) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.number} className="relative pl-20 pb-12 last:pb-0">
                                {/* Circle on Line */}
                                <div className={`absolute left-4 top-2 w-8 h-8 rounded-full flex items-center justify-center ${colorMap[step.color]} text-white`}>
                                    <span className="text-xs font-bold">{step.number}</span>
                                </div>

                                {/* Content */}
                                <div className="p-6 rounded-lg bg-white">
                                    <div className="flex items-start gap-4">
                                        <Icon className={`w-6 h-6 mt-1 flex-shrink-0 ${textColorMap[step.color]}`} />
                                        <div>
                                            <h4 className="text-xl font-bold mb-2 text-slate-900">{step.title}</h4>
                                            <p className="text-sm text-slate-600">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
