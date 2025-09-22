
// ...existing code...
import {
    Card,
    CardContent,
    // ...existing code...
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Highlighter } from '@/Components/ui/highlighter';
import { InteractiveHoverButton } from '@/Components/ui/interactive-hover-button';
import { Pointer } from "@/Components/ui/pointer";
// ...existing code...
// ...existing code...
import { SparklesText } from "@/Components/ui/sparkles-text";
// ...existing code...

export default function AcademicPage() {
    return (
        <div className="relative min-h-screen w-full px-4 pt-24 pb-12" >
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance pb-12">
                <SparklesText>Academic and Extracurricular Achievements</SparklesText>
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-1 md:grid-rows-1 pl-4" >
                <Card className="col-span-1 row-span-1 overflow-hidden border bg-gradient-to-br from-pink-50 to-pink-100 transition-all dark:from-pink-900 dark:to-pink-800 shadow-none">
                    <CardHeader className="relative pb-2">
                        <CardTitle className="text-xl font-bold">Hackathons/Contests/Certification</CardTitle>
                    </CardHeader>
                    <CardContent className="relative flex h-40 ">
                        <span className="pointer-events-none text-xl font-medium text-pink-800 dark:text-pink-200">
                            <p>● Ranked in the top <Highlighter action="box" color="#FF9800">14.11%  </Highlighter> globally in LeetCode, with <Highlighter action="underline" color="#FF9800">650+ problems</Highlighter> solved and a
                                contest rank of <Highlighter action="underline" color="#FF9800">1,400 in Biweekly Contest 156</Highlighter>.</p>
                            <p><span></span> ● <Highlighter action="underline" color="#FF9800">6 Star </Highlighter> in Problem Solving and 5 Star in Python Programming at HackerRank.</p>
                            <p><span className='font-bold '></span>● Certified in Problem Solving (Basic and Intermediate) by HackerRank. </p>
                        </span>
                    </CardContent>
                    <Pointer>
                        <div className="text-2xl">🎉</div>
                    </Pointer>

                </Card>
            </div>
            <div className='flex flex-wrap gap-4 justify-center pt-12'>
                <InteractiveHoverButton onClick={() => window.open('https://leetcode.com/bilal_py/', '_blank')}> LeetCode</InteractiveHoverButton>
                <InteractiveHoverButton onClick={() => window.open('https://www.hackerrank.com/profile/CS1B_1816410099_', '_blank')}> HackerRank</InteractiveHoverButton>
                <InteractiveHoverButton onClick={() => window.open('https://www.hackerrank.com/certificates/9d29b5fdb6ad', '_blank')}> Certificate: Intermediate Problem Solving</InteractiveHoverButton>
                <InteractiveHoverButton onClick={() => window.open('https://www.hackerrank.com/certificates/d4ca1b8ee31b', '_blank')}> Certificate: Basic Problem Solving</InteractiveHoverButton>

            </div>

        </div>
    );
}
