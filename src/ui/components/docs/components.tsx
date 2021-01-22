import * as React from "react";
import { DocComponentSectionProps, DocComponentParagraphProps } from "./interfaces";

export function DocComponentSection(props: DocComponentSectionProps) {
    return (
        <div className="cui-section">
            <h2 className="cui-h2" id={props.section.id}>{props.section.name}</h2>
            {props.section.content && props.section.content.map((paragraph, index) => {
                return <DocComponentParagraph key={index} paragraph={paragraph} />
            })}
        </div>
    );
}


export function DocComponentParagraph(props: DocComponentParagraphProps) {
    return (
        <div className="">
            {props.paragraph.header && <h3 className="cui-h3">{props.paragraph.header}</h3>}
            {props.paragraph.text && <p>{props.paragraph.text}</p>}
            {props.paragraph.list && <ul className="cui-list cui-bullet-shade">
                {props.paragraph.list.map((item, index) => {
                    return <li key={index}>{item}</li>
                })}
            </ul>}
        </div>
    );
}