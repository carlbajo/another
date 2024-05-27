import { auth } from "@/auth";
import { AvatarCard } from "@/components/compile/user/avatar";
import { EducationCard } from "@/components/compile/user/education";
import { ProjectCard } from "@/components/compile/user/project";
import { AchievementCard } from "@/components/compile/user/achievement";
import { SkillCard } from "@/components/compile/user/skill";
export default function Page(){
    return(
        <div className="space-y-8 pb-4">
            <AvatarCard />
            <SkillCard />
            <EducationCard />
            <ProjectCard />
            <AchievementCard />
        </div>
    );  
};