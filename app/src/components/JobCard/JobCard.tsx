import { IconHeart } from "@tabler/icons-react";
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from "@mantine/core";
import classes from "./JobCard.module.css";
import { JobData } from "@/data/types";
import Link from "next/link";

export function JobCard({ data }: { data: JobData }) {
  const { "Company Name": company, "Job Title": title, Location: location, "Website URL": url, "Image URL": imageUrl } = data;
  const saveToSessionStorage = () => {
    const stored = sessionStorage.getItem("job");
    let jobsArray = [];

    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        if (Array.isArray(parsedData)) {
          jobsArray = parsedData;
        }
      } catch (error) {
        console.error("Error parsing sessionStorage data:", error);
        // Handle error or initialize jobsArray as an empty array
      }
    }

    if (!jobsArray.some((job) => job["Website URL"] === data["Website URL"])) {
      // Add the new job data and save it back to sessionStorage
      sessionStorage.setItem("job", JSON.stringify([...jobsArray, data]));
    }
  };

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className="items-center justify-center p-5">
        <Image src={imageUrl} alt={title} style={{ width: 100, height: 100 }} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group justify="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm" variant="gradient">
            {company}
          </Badge>
        </Group>
        <Text fz="sm" mt="xs">
          📍{location}
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Link href={data["Website URL"]}>
          <Button radius="md" style={{ flex: 1, backgroundColor: "grey" }}>
            Show details
          </Button>
        </Link>

        <ActionIcon variant="default" radius="md" size={36} onClick={() => saveToSessionStorage()}>
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}

export default JobCard;
