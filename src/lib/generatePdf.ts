export async function generatePdf() {
  const { renderResumePdf } = await import('./ResumePdf');
  await renderResumePdf();
}
