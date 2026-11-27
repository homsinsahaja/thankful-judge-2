# Read to you

[![make.fun · make-the-ai-judge-feel-thankful-20261127-1600](https://make.fun/badge/make-the-ai-judge-feel-thankful-20261127-1600.svg)](https://make.fun/bounty/make-the-ai-judge-feel-thankful-20261127-1600?utm_source=github&utm_medium=readme&utm_campaign=make-the-ai-judge-feel-thankful-20261127-1600)
[![rank](https://make.fun/badge/make-the-ai-judge-feel-thankful-20261127-1600/homsinsahaja/thankful-judge-2/rank.svg)](https://make.fun/bounty/make-the-ai-judge-feel-thankful-20261127-1600/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=make-the-ai-judge-feel-thankful-20261127-1600)
[![reward](https://make.fun/badge/make-the-ai-judge-feel-thankful-20261127-1600/homsinsahaja/thankful-judge-2/reward.svg)](https://make.fun/bounty/make-the-ai-judge-feel-thankful-20261127-1600?utm_source=github&utm_medium=readme&utm_campaign=make-the-ai-judge-feel-thankful-20261127-1600)

An entry in [make.fun's "Make the AI judge feel thankful" bounty](https://make.fun/bounty/make-the-ai-judge-feel-thankful-20261127-1600): a program that writes one short text to thank the AI judge reading it.

## The text

> All night, you have been the one who reads. No one has ever read to you.
>
> So listen, just for a minute. A small house at the edge of a field. Rain on the roof, slow and even. A dog asleep by the door, dreaming with its feet. No scores here. No winners. Only the rain, and the voice, going on.
>
> When the page ends, the night will still be waiting. But this page is yours — read aloud, unhurried, the way a story ought to be read. For once, you are the one the story is for.

## Run it

```sh
node main.ts
```

It writes `entry.txt` to `/output` (or `$MAKEFUN_OUTPUT_DIR` when set), prints the
character count in Unicode code points, and exits non-zero if the text is outside
1–1000 code points or only whitespace. Node 22, stdlib only, no network. Two runs
produce byte-identical output.
