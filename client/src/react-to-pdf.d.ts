declare module "react-to-pdf" {
    import { ReactNode, RefObject } from "react";
  
    export type PdfProps = {
      targetRef: RefObject<HTMLElement>;
      filename: string;
      children: (props: { toPdf: () => void }) => ReactNode;
    };
  
    const Pdf: React.FC<PdfProps>;
  
    export default Pdf;
  }
  