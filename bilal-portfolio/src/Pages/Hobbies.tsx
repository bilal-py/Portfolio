
import { SkillComponent } from '@/Components/SkillComponent';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Pointer } from "@/Components/ui/pointer";
import { SparklesText } from "@/Components/ui/sparkles-text";

export default function HobbiesPage() {
    return (
        <div className="relative min-h-screen w-full px-4 pt-24 pb-12" >
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance pb-12">
                <SparklesText>Hobbies</SparklesText>
            </h1>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-1 md:grid-rows-1" >
                <Card className="col-span-1 row-span-1 overflow-hidden border bg-gradient-to-br from-yellow-50 to-yellow-100 transition-all dark:from-yellow-900 dark:to-yellow-800 shadow-none">
                    <CardHeader className="relative pb-2">
                        <CardTitle className="text-xl font-bold">Life is Interesting, Hobbies are Fun</CardTitle>
                    </CardHeader>
                    <CardContent className="relative flex h-40 ">
                        <span className="pointer-events-none text-xl font-medium text-yellow-800 dark:text-yellow-200">
                            <p><span className='font-bold '>Guitar:</span></p>
                            <p><span className='font-bold '>Fitness:</span></p>
                            <p><span className='font-bold '>Youtuber:</span></p>
                            <p><span className='font-bold '>Coding:</span></p>


                            
                        </span>
                    </CardContent>
                    <Pointer>
                        <div className="text-2xl">🎸</div>
                    </Pointer>
                </Card>
            </div>
        </div>
    );
}
