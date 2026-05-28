import { cn } from "../utils/cn";
import { MagneticIconLink } from "./MagneticIconLink";
import { GitHubIcon, LinkedInIcon } from "./SocialIcons";

export const GITHUB_URL = "https://github.com/CrestNiraj12";
export const LINKEDIN_URL = "https://www.linkedin.com/in/crestniraj/";

interface ProfileLinkProps {
  className?: string;
  iconClassName?: string;
}

export const GitHubLink = ({ className, iconClassName }: ProfileLinkProps) => (
  <MagneticIconLink href={GITHUB_URL} label="GitHub" className={className}>
    <GitHubIcon className={cn("size-5", iconClassName ?? "")} />
  </MagneticIconLink>
);

export const LinkedInLink = ({
  className,
  iconClassName,
}: ProfileLinkProps) => (
  <MagneticIconLink href={LINKEDIN_URL} label="LinkedIn" className={className}>
    <LinkedInIcon className={cn("size-5", iconClassName ?? "")} />
  </MagneticIconLink>
);
