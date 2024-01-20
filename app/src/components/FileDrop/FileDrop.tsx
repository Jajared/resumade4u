import { useRef, useState } from "react";
import { Text, Group, Button, rem, useMantineTheme } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import classes from "./FileDrop.module.css";
import parseFile from "@/functions/parseFile";
import convertPDF from "@/functions/convertPDF";
import generateTags from "@/functions/generateTag";

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

export function FileDrop({ setApiResponse }: { setApiResponse: (apiResponse: string) => void }) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className={classes.wrapper}>
      <Dropzone
        loading={isLoading}
        openRef={openRef}
        onDrop={async (file) => {
          try {
            setIsLoading(true);
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
            setIsLoading(false);
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
              <IconDownload style={{ width: rem(50), height: rem(50) }} color={theme.colors.blue[6]} stroke={1.5} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX style={{ width: rem(50), height: rem(50) }} color={theme.colors.red[6]} stroke={1.5} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload resume</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </div>
  );
}

export default FileDrop;
