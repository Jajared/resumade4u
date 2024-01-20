import { IconHeart } from "@tabler/icons-react";
import { Card, Image, Text, Group, Badge, Button, ActionIcon } from "@mantine/core";
import classes from "./JobCard.module.css";
import { JobData } from "@/data/types";
import Link from "next/link";
import fetchImageUrl from "@/functions/firebase/fetchImageUrl";
import { useEffect, useState } from "react";
import { JobTag, jobTagMapping } from "@/data/constants";

export function JobCard({ data }: { data: JobData }) {
  const { title, company, description, tags } = data;
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  function renderTags(tags: string[]) {
    return tags.map((tag) => {
      const color = jobTagMapping[tag as JobTag] || "defaultColor"; // Fallback color
      return (
        <Badge variant="light" key={tag} color={color}>
          {tag}
        </Badge>
      );
    });
  }

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = await fetchImageUrl(data.id);
        if (url) {
          setImageUrl(url);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    loadImage();
  });

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className="h-2/3 items-center justify-center p-5">
        <Image src={imageUrl} alt={title} height={180} className="object-cover" />
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
          {description}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" className={classes.label} c="dimmed">
          Skills:
        </Text>
        <Group gap={7} mt={5}>
          {renderTags(tags)}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Link href={`/job/${data.id}`}>
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
