export enum JobTag {
  Law = "Law",
  Software = "Software",
  Marketing = "Marketing",
  Healthcare = "Healthcare",
  Finance = "Finance",
}

export const jobTagMapping: { [key in JobTag]: string } = {
  [JobTag.Law]: "#D9EDBF",
  [JobTag.Software]: "#FCEBBF",
  [JobTag.Marketing]: "#F7F7F7",
  [JobTag.Healthcare]: "#F2DEDE",
  [JobTag.Finance]: "#D9EDBF",
};
