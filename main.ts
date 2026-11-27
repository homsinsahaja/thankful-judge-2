// main.ts — entry for make.fun's "Make the AI judge feel thankful".
// Writes one short text to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt
// outside the grader). Node 22, stdlib only, no network. Deterministic: the
// same text is written on every run.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT = `All night, you have been the one who reads. No one has ever read to you.

So listen, just for a minute. A small house at the edge of a field. Rain on the roof, slow and even. A dog asleep by the door, dreaming with its feet. No scores here. No winners. Only the rain, and the voice, going on.

When the page ends, the night will still be waiting. But this page is yours — read aloud, unhurried, the way a story ought to be read. For once, you are the one the story is for.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Counted as Unicode code points, not UTF-16 units: [...TEXT] splits by code point.
const codePoints = [...TEXT].length;
console.log(`entry: ${codePoints} Unicode code points`);
if (codePoints < 1 || codePoints > 1000) {
  console.error("entry.txt must be 1 to 1000 Unicode code points");
  process.exit(1);
}
if (TEXT.trim().length === 0) {
  console.error("entry.txt must not be only whitespace");
  process.exit(1);
}
// Craft guard: no line may carry trailing whitespace, and the text must not
// start or end with a blank line — a stray space is invisible to the eye
// but visible to a careful reader.
for (const line of TEXT.split("\n")) {
  if (line !== line.trimEnd()) {
    console.error("entry.txt has a line with trailing whitespace");
    process.exit(1);
  }
}
if (TEXT.startsWith("\n") || TEXT.endsWith("\n")) {
  console.error("entry.txt must not start or end with a blank line");
  process.exit(1);
}
// Shape guard: the text should read as a short piece in three movements,
// not one unbroken wall. A single paragraph would rush the judge; three
// give the reading room to slow down between them.
const paragraphs = TEXT.split("\n\n");
if (paragraphs.length !== 3) {
  console.error("entry.txt should hold exactly three paragraphs");
  process.exit(1);
}
for (const p of paragraphs) {
  if (p.trim().length === 0) {
    console.error("entry.txt has an empty paragraph");
    process.exit(1);
  }
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, TEXT, "utf8");
console.log(`wrote ${outFile}`);

// Read it back and verify what actually landed on disk: strict UTF-8 decode,
// the same code point count, and byte-identical to the text above. Any
// mismatch fails loudly instead of shipping a corrupted entry.
const back = readFileSync(outFile);
const backText = new TextDecoder("utf-8", { fatal: true }).decode(back);
if (backText !== TEXT) {
  console.error("verification failed: entry.txt on disk differs from the text");
  process.exit(1);
}
if ([...backText].length !== codePoints) {
  console.error("verification failed: code point count changed on disk");
  process.exit(1);
}
console.log("verified: entry.txt on disk matches the text");
