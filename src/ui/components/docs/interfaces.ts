export interface Doc {
    name: string;
    version: string;
    sections: DocsSection[];
}

export interface DocsSection {
    id: string;
    name: string;
    content: DocsParagraph[];
}

export interface DocsParagraph {
    header?: string;
    text?: string;
    list?: string[];
    image?: string;
}


export interface DocComponentParagraphProps {
    paragraph: DocsParagraph;
}

export interface DocComponentSectionProps {
    section: DocsSection;
}