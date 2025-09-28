
// ...existing code...
import { SkillComponent } from "@/Components/SkillComponent";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Pointer } from "@/Components/ui/pointer";
import { SparklesText } from "@/Components/ui/sparkles-text";
import { ScrollTechComponent } from "./ScrollTechComponent";

export default function SkillsPage() {
    return (
        <div className="relative min-h-screen w-full px-4 pt-24 pb-12" >
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance pb-12">
                <SparklesText>Skills</SparklesText>
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-1 md:grid-rows-1" >
                <Card className="col-span-1 row-span-1 overflow-hidden border bg-gradient-to-br from-yellow-50 to-yellow-100 transition-all dark:from-yellow-900 dark:to-yellow-800 shadow-none">
                    <CardHeader className="relative pb-2">
                        <CardTitle className="text-xl font-bold">Tech-Stacks</CardTitle>
                    </CardHeader>
                    <CardContent className="relative flex flex-col min-h-[120px] sm:min-h-[160px]">
                        <span className="pointer-events-none text-base sm:text-xl font-medium text-yellow-800 dark:text-yellow-200">
                            <p><span className='font-bold '>Languages:</span> C#, Python, JavaScript, LINQ</p>
                            <p><span className='font-bold '>Frameworks & Libraries:</span> .NET, Entity Framework, React, jQuery, Bootstrap </p>
                            <p><span className='font-bold '>Databases:</span> SQL Server, Postgres SQL </p>
                            <p><span className='font-bold '>Tools & Testing:</span> xUnit, Postman, Jira, Git</p>
                            <p><span className='font-bold '>Core Concepts:</span> OOP, SOLID Principles, Data Structures & Algorithms, Agile Methodologies</p>
                        </span>
                    </CardContent>
                    <Pointer>
                        <div className="text-2xl">👨‍💻</div>
                    </Pointer>
                </Card>
            </div>
            <SkillComponent />
            <ScrollTechComponent />

        </div>
    );
}
