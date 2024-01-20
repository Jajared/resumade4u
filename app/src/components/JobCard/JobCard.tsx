import { IconHeart } from "@tabler/icons-react";
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from "@mantine/core";
import classes from "./JobCard.module.css";
import { JobData } from "@/data/types";
import Link from "next/link";

export function JobCard({ data }: { data: JobData }) {
  const { "Company Name": company, "Job Title": title, Location: location, "Website URL": url, "Image URL": imageUrl } = data;

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className="items-center justify-center p-5">
        <Image src={imageUrl} alt={title} />
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
          {location}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Skills:
        </Text>
      </Card.Section>

      <Group mt="xs">
        <Link href={`/job/${data["Website URL"]}`}>
          <Button radius="md" style={{ flex: 1, backgroundColor: "grey" }}>
            Show details
          </Button>
        </Link>

        <ActionIcon variant="default" radius="md" size={36}>
          <IconHeart className={classes.like} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Card>
  );
}

export default JobCard;
