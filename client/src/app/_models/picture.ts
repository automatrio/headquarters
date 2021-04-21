import { Media } from "./media";

export class Picture implements Media
{
    id: number;
    url: string;
    description: string;
    file: File;
}