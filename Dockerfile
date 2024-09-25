FROM oven/bun
RUN bun install
COPY .
CMD ["bun","run","start"]