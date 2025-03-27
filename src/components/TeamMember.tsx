
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TeamMemberProps {
  name: string;
  role: string;
  photoUrl?: string;
  delay: number;
  isVisible: boolean;
}

const TeamMember = ({ name, role, photoUrl, delay, isVisible }: TeamMemberProps) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('');
    
  return (
    <div 
      className={cn(
        "flex flex-col items-center text-center transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        `delay-${delay}`
      )}
    >
      <Avatar className="w-24 h-24 mb-4 border-2 border-kambl-light">
        {photoUrl ? (
          <AvatarImage src={photoUrl} alt={`${name}, ${role} at Kambl Creations`} />
        ) : (
          <AvatarFallback className="bg-kambl-beige text-kambl text-lg">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      <h3 className="font-medium text-lg">{name}</h3>
      <p className="text-kambl-muted text-sm">{role}</p>
    </div>
  );
};

export default TeamMember;
