import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import toast from 'react-hot-toast';

const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(5, 'Subject must be at least 5 characters'),
    message: z.string().min(10, 'Message must be at least 10 characters')
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Contact form submitted:', data);
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        reset();
        setIsSubmitting(false);
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email',
            value: 'support@rideshare.com',
            link: 'mailto:support@rideshare.com'
        },
        {
            icon: Phone,
            title: 'Phone',
            value: '+880 1234-567890',
            link: 'tel:+8801234567890'
        },
        {
            icon: MapPin,
            title: 'Address',
            value: 'Dhaka, Bangladesh',
            link: null
        },
        {
            icon: Clock,
            title: 'Business Hours',
            value: '24/7 Support Available',
            link: null
        }
    ];

    const faqs = [
        {
            question: 'How do I request a ride?',
            answer: 'Simply enter your pickup and destination locations, select your vehicle type, and tap "Find Driver". You\'ll be matched with a nearby driver instantly.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept cash, credit/debit cards, and mobile payment methods. You can manage your payment methods in the app settings.'
        },
        {
            question: 'How do I become a driver?',
            answer: 'Register as a driver through our app, submit required documents (license, vehicle registration, insurance), and complete our verification process.'
        },
        {
            question: 'Is my ride safe?',
            answer: 'Yes! All drivers undergo background checks, and every ride is tracked in real-time. We also provide an in-app SOS button for emergencies.'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-12 animate-slide-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Get in <span className="text-indigo-600">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Have questions or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="animate-slide-up">
                            <div className="flex items-center gap-3 mb-6">
                                <MessageSquare className="h-6 w-6 text-indigo-600" />
                                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register('name')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="Your name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="your.email@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        {...register('subject')}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="What is this about?"
                                    />
                                    {errors.subject && (
                                        <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        {...register('message')}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    isLoading={isSubmitting}
                                    fullWidth
                                    size="lg"
                                    className="ripple"
                                >
                                    <Send className="h-5 w-5 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </Card>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
                            return (
                                <Card
                                    key={index}
                                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all animate-slide-up"
                                    style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                                            <Icon className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                                            {info.link ? (
                                                <a
                                                    href={info.link}
                                                    className="text-indigo-600 hover:text-indigo-700 hover:underline"
                                                >
                                                    {info.value}
                                                </a>
                                            ) : (
                                                <p className="text-gray-600">{info.value}</p>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="animate-slide-up">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faqs.map((faq, index) => (
                            <Card key={index} className="hover:shadow-lg transition-all duration-300">
                                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                                    <span className="text-indigo-600 flex-shrink-0">Q:</span>
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 ml-6">{faq.answer}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
