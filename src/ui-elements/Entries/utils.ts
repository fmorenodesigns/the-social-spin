export async function copyToClipboard(text: string) {
  const data = [
    new ClipboardItem({
      "text/plain": new Blob([text], { type: "text/plain" }),
    }),
  ];

  let success = false;
  await navigator.clipboard.write(data).then(() => {
    success = true;
  });

  return success;
}
