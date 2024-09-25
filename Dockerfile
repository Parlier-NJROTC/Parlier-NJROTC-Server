FROM oven/bun
RUN bun install
CMD ["bun", "index.ts"]