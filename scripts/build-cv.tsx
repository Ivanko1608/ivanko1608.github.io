// Renders the CV to public/ivan-kramarenko-cv.pdf so it ships as a static file.
import { renderToFile } from '@react-pdf/renderer';
import { ResumeDocument } from '../src/lib/ResumePdf';

const out = new URL('../public/ivan-kramarenko-cv.pdf', import.meta.url).pathname;
await renderToFile(<ResumeDocument />, out);
console.log(`CV written to ${out}`);
