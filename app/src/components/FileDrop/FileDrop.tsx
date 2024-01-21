import { useRef, useState } from "react";
import { Text, Group, Button, rem, useMantineTheme } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import classes from "./FileDrop.module.css";
import parseFile from "@/functions/parseFile";
import convertPDF from "@/functions/convertPDF";
import generateTags from "@/functions/generateTag";
import { Loader } from "@mantine/core";

function readFileAsArrayBuffer(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

export function FileDrop({ setApiResponse, loading, setLoading }: { setApiResponse: (apiResponse: string) => void; loading: boolean; setLoading: (loading: boolean) => void }) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  return (
    <div className={classes.wrapper}>
      <Dropzone
        loading={loading}
        openRef={openRef}
        onDrop={async (file) => {
          try {
            setLoading(true);
            let result;

            if (file[0].type === MIME_TYPES.pdf) {
              const arrayBuffer = await readFileAsArrayBuffer(file[0]);
              result = await convertPDF(arrayBuffer);
            } else {
              result = await parseFile(file);
            }
            let apiResult = await generateTags(result);
            if (apiResult.message.content) {
              setApiResponse(apiResult.message.content);
            }
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        }}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.pdf]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload style={{ width: rem(50), height: rem(50) }} color={theme.colors.green[6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX style={{ width: rem(50), height: rem(50) }} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} color={theme.colors.grape[6]} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl" variant="gradient" gradient={{ from: "grape", to: "cyan", deg: 90 }}>
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload resume (PDF/Image)</Dropzone.Idle>
          </Text>
          <Text ta="center" size="lg" fz="sm" mt="xs" c="white">
            Drag&apos;n&apos;drop files here to upload. We can accept only images or <i>.pdf</i> files that are less than 30mb in size
          </Text>
        </div>
      </Dropzone>
    </div>
  );
}

export default FileDrop;
