FROM oven/bun
RUN apt-get update && apt-get install -y python3 python3-pip

COPY . .
RUN python3 -m venv /pyVenvWelded
ENV PATH="/pyVenvWelded/bin/$PATH"
RUN pip install --no-cache-dir pause requests python-dotenv colorama
RUN bun install
CMD ["bun","run","start"]