// types/pdf-parse.d.ts
declare module "pdf-parse/lib/pdf-parse" {
  import { Buffer } from "buffer";

  interface PDFMeta {
    info: any;
    metadata: any;
    version: string;
  }

  interface PDFData extends PDFMeta {
    text: string;
    numpages: number;
    numrender: number;
    outline: any;
    formImage: any;
    javascript: any[];
  }

  function pdf(buffer: Buffer): Promise<PDFData>;
  export default pdf;
}
