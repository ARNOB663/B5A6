import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = false,
    onClick,
    style
}) => {
    const baseClasses = 'bg-white rounded-xl shadow-md p-6';
    const hoverClasses = hover ? 'card-hover cursor-pointer' : '';
    const clickableClasses = onClick ? 'cursor-pointer' : '';

    return (
        <div
            className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
            onClick={onClick}
            style={style}
        >
            {children}
        </div>
    );
};

export default Card;

// Card variants
interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}

export const StatCard: React.FC<StatCardProps> = ({
    label,
    value,
    icon,
    color = 'bg-indigo-500',
    trend
}) => {
    return (
        <Card className="animate-slide-up">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    {trend && (
                        <p className={`text-sm mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                        </p>
                    )}
                </div>
                <div className={`p-3 rounded-full ${color} text-white`}>
                    {icon}
                </div>
            </div>
        </Card>
    );
};
