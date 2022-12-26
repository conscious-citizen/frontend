import {AlignmentType, Document, HeadingLevel, ImageRun, Paragraph} from "docx";
import * as loc from "libreoffice-convert"
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CreateDocumentService {

    constructor() {

    }

    public create(firstName: any, lastName: any, patronymic: any, city: any, street: any, house: any, phoneNumber: any,
                  title: any, message: any, photos: any, address: any, home: any): Document {

        const document = new Document({
            styles: {
                paragraphStyles: [
                    {
                        id: "Heading2",
                        name: "Heading 2",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            color: "#000000",
                            size: 28
                        }, paragraph: {
                            spacing: {
                                after: 120,
                            },
                        }
                    },
                    {
                        id: "Heading1",
                        name: "Heading 1",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            color: "#000000",
                            size: 28
                        }, paragraph: {
                            spacing: {
                                after: 120,
                            },
                        },
                    }
                ],
            },
            sections: [
                {
                    children: [new Paragraph({
                        text: 'В Федеральную службу по надзору в сфере защиты прав потребителей и благополучия человека Российской Федерации',
                        alignment: AlignmentType.RIGHT,
                        heading: HeadingLevel.HEADING_2,

                    }),
                        new Paragraph({
                            text: `От гражданина: ${firstName} ${lastName} ${patronymic}`,
                            alignment: AlignmentType.RIGHT,
                            heading: HeadingLevel.HEADING_2
                        }),
                        new Paragraph({
                            text: `Адрес проживания: г. ${city} улица ${street}`,
                            alignment: AlignmentType.RIGHT,
                            heading: HeadingLevel.HEADING_2
                        }),
                        new Paragraph({
                            text: `Номер телефона: ${phoneNumber}`,
                            alignment: AlignmentType.RIGHT,
                            heading: HeadingLevel.HEADING_2
                        }),
                        new Paragraph({
                            text: 'Жалоба', alignment: AlignmentType.CENTER,
                            heading: HeadingLevel.TITLE
                        }),
                        new Paragraph({
                            text: `Тема обращения:${title}`,
                            heading: HeadingLevel.HEADING_1
                        }),

                        new Paragraph({
                                text: `${message}. Нарушение обнаружено по следующему адресу: ${address} ${home}. Фотография инцидента представлена ниже.`,
                                alignment: AlignmentType.JUSTIFIED,
                            heading: HeadingLevel.HEADING_1
                            }
                        ),
                        new Paragraph({
                            children: [
                                new ImageRun({
                                    data: photos,
                                    transformation: {
                                        width: 400,
                                        height: 400,
                                    },

                                }),
                            ],
                            alignment:AlignmentType.CENTER


                        }),
                        new Paragraph({
                            text:'Прошу принять соответствующие меры.',
                            alignment: AlignmentType.LEFT,
                            heading: HeadingLevel.HEADING_1

                        })

                    ]
                }
            ]
        });

        return document;
    }

    }

