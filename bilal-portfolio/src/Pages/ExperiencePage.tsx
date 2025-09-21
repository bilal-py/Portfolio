import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Highlighter } from "@/Components/ui/highlighter";
import { Pointer } from "@/Components/ui/pointer";
import { SparklesText } from "@/Components/ui/sparkles-text";
import { motion } from "motion/react";

export function ExperiencePage() {
    return (
        <div className="relative min-h-screen w-full px-2 pt-24 pb-12 md:pl-[220px] flex flex-col">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance pb-12">
                <SparklesText>Work Experience</SparklesText>
            </h1>
            <div className="flex flex-row gap-6 pl-4 w-full max-w-7xl mx-auto overflow-x-auto pb-4 md:grid md:grid-cols-1 md:overflow-x-visible">

                <Card className="flex flex-col col-span-1 overflow-hidden border bg-gradient-to-br from-slate-50 to-slate-100 transition-all dark:from-slate-900 dark:to-slate-800 shadow-none min-h-[320px]">
                    <CardHeader className="relative pb-2">
                        <CardTitle className="text-xl font-bold">LTIMindtree | Consultant | Noida</CardTitle>
                        <CardDescription className="text-sm text-slate-600 dark:text-slate-400 pb-6">
                            July 2024 – Present
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative flex flex-col gap-2 flex-1 justify-center p-4 text-base text-left">
                        <span className="pointer-events-none text-base md:text-lg font-medium text-slate-800 dark:text-slate-200 pb-2">
                            <p className="mb-2">Working on an Insurance domain project, developing and maintaining an end-to-end application.</p>
                            <Highlighter action="underline" color="#FF9800">
                                <span className="font-semibold">Track Rate:</span>
                            </Highlighter>
                            <ul className="list-disc ml-5 mb-2">
                                <li>Contributing to the development of functionality for tracking insurance formulas across all coverages.</li>
                                <li>Improved tracking rate efficiency by dynamically setting coverage tracks based on the specified formulas.</li>
                            </ul>
                            <Highlighter action="underline" color="#FF9800">
                                <span className="font-semibold">Tech Stack:</span> C#, SQL Server, .NET, JavaScript
                            </Highlighter>
                        </span>
                    </CardContent>
                    <Pointer>
                        <motion.div
                            animate={{
                                scale: [0.8, 1, 0.8],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-pink-600"
                            >
                                <motion.path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill="currentColor"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                            </svg>
                        </motion.div>
                    </Pointer>
                </Card>

                {/* <Card className="col-span-1 row-span-1 overflow-hidden border bg-gradient-to-br from-blue-50 to-blue-100 transition-all dark:from-blue-900 dark:to-blue-800 shadow-none">
                    <CardHeader className="relative pb-2">
                        <CardTitle className="text-xl font-bold">Class X and XII </CardTitle>
                        <CardDescription className="text-sm text-blue-700 dark:text-blue-300">
                            2015-2017
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative flex h-40 items-center justify-center p-6">
                        <span className="pointer-events-none text-center text-xl font-medium text-blue-800 dark:text-blue-200">
                            Wendy Academy High School, India
                            <p>ISC (Class XII), Grade: 79.8 %</p>
                            <p>ICSE (Class X), Grade: 79.1 %</p>
                        </span>
                    </CardContent>
                    <Pointer className="fill-blue-500" />
                </Card> */}

                <Card className="flex flex-col col-span-1 overflow-hidden border bg-gradient-to-br from-purple-50 to-purple-100 transition-all dark:from-purple-900 dark:to-purple-800 shadow-none min-h-[320px]">
                    <CardHeader className="relative pb-2">
                        <CardTitle className="text-xl font-bold">GlobalLogic| Software Engineer | Noida </CardTitle>
                        <CardDescription className="text-sm text-purple-700 dark:text-purple-300">
                            June 2022 – July 2024
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative flex flex-col gap-2 flex-1 justify-center p-4 text-base text-left">
                        <span className="pointer-events-none text-base md:text-lg font-medium text-purple-800 dark:text-purple-200">
                            <ul className="list-disc ml-5 mb-2">
                                <li>Contributed to the development of a Natural Resources data and analytics project, streamlining the integration and benchmarking of emissions data.</li>
                                <li>Developed and enhanced features for the Lens Carbon platform, focusing on Carbon Capture, Utilization, and Storage (CCUS) to improve data insights and workflows for carbon management.</li>
                            </ul>
                            <Highlighter action="underline" color="#ab08d7ff">
                                <span className="block font-semibold mb-1">Tech Stack: C#, SQL Server, .NET Core, JavaScript, React, xUnit</span>
                            </Highlighter>

                            <ul className="list-disc ml-5 mb-2">
                                <li>Worked on a full-stack banking domain project, actively contributing to the development and maintenance of web applications.</li>
                                <li>Played a key role in designing and implementing features for applicant details pages, including joint applicants, and enhanced existing functionality.</li>
                            </ul>
                            <Highlighter action="underline" color="#ab08d7ff">
                                <span className="block font-semibold mb-1">Tech Stack: C#, SQL Server, .NET, JavaScript, jQuery, Bootstrap</span>
                            </Highlighter>
                        </span>
                    </CardContent>
                    <Pointer>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="12" cy="12" r="10" className="fill-purple-500" />
                            <circle cx="12" cy="12" r="5" className="fill-white" />
                        </svg>
                    </Pointer>
                </Card>

                <Card className="flex flex-col col-span-1 overflow-hidden border bg-gradient-to-br from-green-50 to-green-100 transition-all dark:from-green-900 dark:to-green-800 shadow-none min-h-[320px]">
                    <CardHeader className="relative pb-2">
                        <CardTitle className="text-xl font-bold">Hitachi Vantara | Software Development Engineer Intern</CardTitle>
                        <CardDescription className="text-sm text-green-700 dark:text-green-300">
                            Feb 2022- June 2022
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="relative flex flex-col gap-2 flex-1 justify-center p-4 text-base text-left">
                        <span className="pointer-events-none text-base md:text-lg font-medium text-green-800 dark:text-green-200">
                            <ul className="list-disc ml-5 mb-2">
                                <li>Worked with App Engineering team to handle different requirements of projects.</li>
                            </ul>
                            <Highlighter action="underline" color="#57e11bff">
                                <span className="block font-semibold mb-1">Tech Stack: Salesforce, Apex</span>
                            </Highlighter>

                        </span>
                    </CardContent>
                    <Pointer>
                        <div className="text-2xl">👆</div>
                    </Pointer>
                </Card>
            </div>
        </div>
    );
}
