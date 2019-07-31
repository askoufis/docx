/* tslint:disable:typedef space-before-function-paren */
import { assert } from "chai";
import { stub } from "sinon";

import { File, HeadingLevel, Paragraph } from "file";

import { Packer } from "./packer";

describe("Packer", () => {
    let packer: Packer;
    let file: File;

    beforeEach(() => {
        file = new File({
            creator: "Dolan Miu",
            revision: "1",
            lastModifiedBy: "Dolan Miu",
        });

        file.addSection({
            children: [
                new Paragraph({
                    text: "title",
                    heading: HeadingLevel.TITLE,
                }),
                new Paragraph({
                    text: "Hello world",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "heading 2",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph("test text"),
            ],
        });

        packer = new Packer();
    });

    describe("#toBuffer()", () => {
        it("should create a standard docx file", async function() {
            this.timeout(99999999);
            const buffer = await packer.toBuffer(file);

            assert.isDefined(buffer);
            assert.isTrue(buffer.byteLength > 0);
        });

        it("should handle exception if it throws any", () => {
            // tslint:disable-next-line:no-any
            const compiler = stub((packer as any).compiler, "compile");

            compiler.throwsException();
            return packer.toBuffer(file).catch((error) => {
                assert.isDefined(error);
            });
        });
    });

    describe("#toBase64String()", () => {
        it("should create a standard docx file", async function() {
            this.timeout(99999999);
            const str = await packer.toBase64String(file);

            assert.isDefined(str);
            assert.isTrue(str.length > 0);
        });

        it("should handle exception if it throws any", () => {
            // tslint:disable-next-line:no-any
            const compiler = stub((packer as any).compiler, "compile");

            compiler.throwsException();
            return packer.toBase64String(file).catch((error) => {
                assert.isDefined(error);
            });
        });
    });
});
